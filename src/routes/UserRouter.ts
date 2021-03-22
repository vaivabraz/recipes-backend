import express from 'express';
import { getAllUsers, getMe } from '../controllers/UserController';
import { registerUser, loginUser, logoutUser } from '../controllers/user';

import {
  refreshSession,
  revokeRefreshTokenForUser,
} from '../controllers/SessionController';
import { isAuth } from '../middleware/isAuth';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());
router.route('/refresh_session').post(refreshSession);
router.route('/revokeRefreshTokenForUser').post(revokeRefreshTokenForUser);

router.route('/user/registerUser').post(registerUser);
router.route('/user/loginUser').post(loginUser);
router.route('/user/logout').get(logoutUser);

router.use('/user/getAllUsers', isAuth);
router.use('/user/me', isAuth);
router.route('/user/getAllUsers').get(getAllUsers);
router.route('/user/me').get(getMe);
export default router;
