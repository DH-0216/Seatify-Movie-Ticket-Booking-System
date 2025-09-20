import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";

import bookingRouter from "./routes/bookingRoutes.js";

import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


const app = express();


app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)


//middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Seatify Movie Ticket Booking System API!");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter)

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
