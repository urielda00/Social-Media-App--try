import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend
} from '../controllers/users.js';

import { verifyToken } from '../middleware/auth.js';


const router= express.router();

//read route:
router.get('/:id',verifyToken, getUser);
router.get('/:id/friends',verifyToken, getUserFriends);


//update route:
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);


export default router;