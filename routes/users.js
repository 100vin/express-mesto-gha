import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';

export const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
