import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // matches your dummy data _id
    id: { type: Number, required: true }, // numeric ID from dummy data
    title: { type: String, required: true },
    subtitle: { type: String }, // optional
    overview: { type: String, required: true },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    release_date: { type: String, required: true },
    original_language: { type: String },
    tagline: { type: String },
    genres: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    casts: [
      {
        name: { type: String },
        character: { type: String },
        profile_path: { type: String },
      },
    ],
    vote_average: { type: Number, required: true },
    vote_count: { type: Number }, // included in dummy data
    runtime: { type: Number },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
