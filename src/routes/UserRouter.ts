import express from 'express';
import { getAllUsers, registerUser } from '../controllers/UserController';

const router = express.Router();
// router.route('/user').get(getAllUsers).post(getAllUsers);
router.route('/user/getAllUsers').get(getAllUsers);
router.route('/user/registerUser').post(registerUser);
export default router;
