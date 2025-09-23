import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Stripe from "stripe";
import { inngest } from "../inngest/index.js";

// Function to check availability of selected seats
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats || {};
    const isAnySeatsTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatsTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return res.json({ success: false, message: "No seats selected." });
    }

    // Check seat availability
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    // Get show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({ success: false, message: "Show not found." });
    }

    const showPrice = Number(showData.showprice) || 0;
    const amount = showPrice * selectedSeats.length;

    // Enforce Stripe minimum charge (approx. $0.50 equivalent)
    const MIN_CHARGE_LKR = Number(process.env.MIN_CHARGE_LKR || 200);
    if (amount < MIN_CHARGE_LKR) {
      return res.json({
        success: false,
        message: `Total too low. Minimum allowed is LKR ${MIN_CHARGE_LKR}.`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount,
      bookedSeats: selectedSeats,
    });

    // Mark seats as occupied
    if (!showData.occupiedSeats) showData.occupiedSeats = {};
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    // Stripe session
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: "lkr", // Use Sri Lankan Rupee (zero-decimal currency in Stripe)
          product_data: { name: showData.movie.title },
          unit_amount: Math.round(amount * 100), // LKR has 2 decimals; send cents
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/mybookings`,
      cancel_url: `${origin}/mybookings`,
      line_items,
      mode: "payment",
      metadata: { bookingId: booking._id.toString() },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    booking.paymentLink = session.url;
    await booking.save();

    // Schedule payment check (non-blocking; skip if no Inngest key configured)
    if (process.env.INNGEST_EVENT_KEY) {
      try {
        await inngest.send({
          name: "app/checkpayment",
          data: { bookingId: booking._id.toString() },
        });
      } catch (inngestError) {
        console.warn(
          "Failed to schedule Inngest payment check:",
          inngestError?.message || inngestError
        );
      }
    } else {
      console.warn(
        "INNGEST_EVENT_KEY is not set; skipping payment check scheduling."
      );
    }

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData)
      return res.json({ success: false, message: "Show not found." });

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
