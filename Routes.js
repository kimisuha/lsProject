import express from 'express';

import UserController from './Controller/user.js';
import postController from './Controller/post.js';

const router = express.Router();


router.route('/')
    .get((req, res, next) => {
        res.render('login.pug');
    })
.post(UserController.checkLogin)

router.route('/share/user/:id/')
    .put(postController.changeShareList)
    .post(postController.shareTo)


router.route('/user/:info')
    .get(UserController.getUserInfomation)
    .put(UserController.UpdateUserInfomation)
    .delete(UserController.removeUser)

router.route('/user')
    .get((req, res, next) => {
        res.render('Signup.pug');
    })

router.route('/forgotpass')
    .get((req, res, next) => {
        res.render('forgot.pug');
    })

router.route('/dashboard')
    .get((req, res, next) => {
        res.render('dashboard.pug');
    })

router.post('/pagi/:id/:page/:perpage', postController.pagination);

router.route('/post/:postinfo')
    .get(postController.getPost)
    .post(postController.createPost)
    .put(postController.modifiedPost)
    .delete(postController.removePost)

router.get('/test', function (req, res, next) {
    res.render('login.pug');
})

router.post('/test', function(req, res, next) {
    res.send(req.query);
})

router.get('*', (req, res, next) => {
    res.send("not found!");
})





export default router;