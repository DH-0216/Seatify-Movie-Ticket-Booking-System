import { Inngest } from "inngest";
import User from "../models/User.js";
import sendEmail from "../config/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "seatify-movie-ticket-booking" });

// Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);

// Inngest function to handle user deletion
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to handle user updates
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);



//Inngest Function to send email when user books a show

const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send booking-confirmation-email" },
  { event: "app/show,booked" },
  async ({ event, step }) => {
    const { bookingId } = event.data;

    const booking = await booking.findById(bookingId).populate({
      path: "show",
      populate: { path: "movie", model: "Movie" }
    }).populate("user");

    await sendEmail({
      to: booking.user.email,
      subject: 'payment Confirmation:"${booking.show.movie.title}  " Booked!',
      body: `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <h2>Hi ${booking.user.name},</h2>
  <p>Your booking for <strong style="color: #F84565;">
    ${booking.show.movie.title}</strong> is confirmed.</p>
  <p>
    <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}<br>
    <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
  </p>
  <p>Enjoy the show!</p>
  <p>Thanks for booking with us!<br/>— QuickShow Team</p>
</div>`
    })



  }

)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdate,sendBookingConfirmationEmail];
