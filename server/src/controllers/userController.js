import { clerkClient } from '@clerk/clerk-sdk-node';
import Booking from '../models/Booking.js';
import movie from '../models/Movie.js';

// Api controller function to get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId; // Assuming user ID is available in req.auth  
        const bookings = await Booking.find({ user }).populate({
            path: 'show',
            populate: { path: "movie" }
        }).sort({ createdAt: -1 })// Fetch bookings for the user
        res.json({success: true, bookings})// Send bookings as response

    } catch (error) {
        console.error(Error.message);
        res.json({ success: false, message: error });
    }
}


export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId; // Assuming user ID is available in req.auth
        const user = await clerkClient.users.getUser(userId)

        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = []
        }

        if (!user.privateMetadata.favorites.includes(movieId)) {
            user.privateMetadata.favorites.push(movieId)
        } else {
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
         }

        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: user.privateMetadata })
        
        res.json({ success: true, message: "Movie added to successfully." })

    } catch (error) {
        console.error(Error.message);
        res.json({ success: false, message: error });
    }
}

export const getFavorites = async (req, res) => { 
    try {
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;

        //getting movie from database
        const movies = await movie.find({ _id: { $in: favorites } })
        
        res.json({ success: true, movies })
    } catch (error) {
        console.error(Error.message);
        res.json({ success: false, message: error });
    }
}
