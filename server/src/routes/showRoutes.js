import express from "express";
import { getNowPlayingMovies } from "../controllers/showController.js";
import { addShow } from '../controllers/showController.js';


const showRouter = express.Router();

showRouter.get('/now-playing', protectAdmin, getNowPlayingMovies)
showRouter.post('/add', protectAdmin, addShow)
showRouter.get("/all", getShows)
showRouter.get("/:movie_id", getShow)

export default showRouter;