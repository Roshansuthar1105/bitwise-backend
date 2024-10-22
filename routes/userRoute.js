// import  express  from "express";
// import {  user } from "../controllers/authController.js";
// import authMiddleware from "../middlewares/authMiddleware.js";
// const userRouter = express.Router();

// userRouter.route("/").get(authMiddleware,user);
// export default userRouter ;
import express from 'express';
import { user, toggleWatchlist, getWatchlist } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Route to get user info (already implemented)
userRouter.route('/').get(authMiddleware, user);

// Route to add a course to the user's watchlist
userRouter.post('/addToWatchlist', authMiddleware, toggleWatchlist);

// Route to get the user's watchlist
userRouter.get('/watchlist', authMiddleware, getWatchlist);

export default userRouter;
