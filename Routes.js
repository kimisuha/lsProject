import express, { response } from 'express';

import UserController, { jwtCheck, verifyMail } from './Controller/user.js';
import postController from './Controller/post.js';
import { checkverify } from './Midleware/checkVerify.js';


const router = express.Router();


router.route('/')
    .get((req, res, next) => {
        res.render('login.pug');
    })
    .post(UserController.Login)

router.route('/share/user/:id/')
    .put(checkverify, postController.changeShareList)
    .post(checkverify, postController.shareTo)


router.route('/user/:info')
    .get(checkverify, UserController.getUserInfomation)
    .post(checkverify, UserController.changePass)
    .put(checkverify, UserController.UpdateUserInfomation)
    .delete(UserController.removeUser)

router.route('/user')
    .post(UserController.createUser)

router.route('/forgotpass')
    .post(UserController.forgotPassword)

/* router.route('/dashboard')
    .get((req, res, next) => {
        res.render('dashboard.pug');
    })
 */
router.get('/pagi/:id/:page/:perpage', postController.pagination);

router.get('/test', async function(req, res, next){
    //console.log(req);
    
    let test = req;
    console.log(test)

    //res.send(test);
})

router.route('/post/:postinfo')
    .get(postController.getPost)
    .post(postController.createPost)
    .put(postController.modifiedPost)
    .delete(postController.removePost)



router.route('/user/status')
    .put(checkverify, UserController.updateStatus)

router.get('*', (req, res, next) => {
    res.send("not found!");
})





export default router;