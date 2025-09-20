import Show from "../models/Show.js";
import Booking from "../models/Booking.js";


//function to check availability of selected seats for a movie
const checkAvailability = async (showId, selectedSeats)=> {
    try {
       const showData = await showId.findById(showId)
       if(!showData) return false;

       const occupiedSeats = showData.occupiedSeats;

       const isAnySeatsTaken = selectedSeats.some(seat => occupiedSeats[seat]);

       return !isAnySeatsTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

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


        //stripe gateway initialize
        res.json({success: true, message: "Booked successfully"})

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

        res.json({success: false, occupiedSeats})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}