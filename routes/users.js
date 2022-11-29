import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';

export const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
