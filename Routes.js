import express, { response } from 'express';

import UserController from './Controller/user.js';
import postController from './Controller/post.js';
import { checkverify } from './Midleware/checkVerify.js';
import passport from 'passport';
import passportjwt from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();


const strag = passportjwt.Strategy;
const extractJwt = passportjwt.ExtractJwt;

const checklog = passport.authenticate('jwt', {
    session: false,
});


passport.use(new strag({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_TOKEN
}, (payload, done) => {
    try {
        //console.log(payload);
        done(false, payload);
    } catch (err) {
        console.log(err);
        done(false, err);
    }
}))

router.route('/')
    .get(checklog, UserController.getUser)
    .post(UserController.Login)

router.route('/share/user/:id/')
    .get(checklog, postController.getShareList)
    .put(checklog, postController.changeShareList)
    .post(checklog, postController.shareTo)


router.route('/user/:info')
    .get([checklog, checkverify], UserController.getUserInfomation)
    .post([checklog, checkverify], UserController.changePass)
    .put(checkverify, UserController.UpdateUserInfomation)
    .delete(UserController.removeUser)

router.route('/user')
    .post(UserController.createUser)

router.route('/forgotpass')
    .post(UserController.forgotPassword)

router.get('/pagi/:info/:page/:perpage', [checklog], postController.pagination);

router.route('/post')
    .get([checklog, checkverify], postController.getPost)
    .post([checklog], postController.createPost)
    .put([checklog], postController.modifiedPost)
    .delete(postController.removePost)



router.route('/user/status')
    .put(checkverify, UserController.updateStatus)

router.post('/check', checklog, postController.checkStatus)

router.get('/sort/:sort', checklog, postController.sortBy);

router.route('/filter/:filter')
    .post(checklog, postController.filter)

router.get('*', (req, res, next) => {
    res.send("not found!");
})


export default router;