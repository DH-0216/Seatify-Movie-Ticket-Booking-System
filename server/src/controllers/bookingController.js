import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import stripe from 'stripe';
import { inngest } from "../inngest/index.js";


//function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await showId.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatsTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatsTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const {origin} = req.headers;

        //check if seats are available for the selected shows
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

        if(!isAvailable) {
            return res.json({success:false, message: "Selected seats are not available."})
        }

        //get show details
        const showData = await Show.findById(showId).populate('movie');

        //create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        selectedSeats.map(()=> {
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');
        await showData.save();

        const stripeInstance = new stripe (process.env.STRIPE_SECRET_KEY)

        const line_items = [{
            price_data: {
              currency: 'usd',  
              product_data: {
                name:showData.movie.title
              },
              unit_amount: Math.floor (booking.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
               bookingId: booking._id.toString() 
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 15 minutes expiration

        })

        booking.paymentLink = session.url
        await booking.save()

        //run inngest scheduler function to check payment status after 10 minutes
        await inngest.send({
	        name: "app/checkpayment",
	        data: {
		        bookingId: booking._id.toString()
	        }
        })

        //stripe gateway initialize
        res.json({success: true, url: session.url})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const getOccupiedSeats = async (req, res)=>{
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats)

        res.json({success: true, occupiedSeats})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}