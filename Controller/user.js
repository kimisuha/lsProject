import User from "../Model/user.js";
//import bcryptjs from 'bcryptjs';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import Verify from "../Model/verify.js";
import Token from "../Model/token.js";
import jwt from 'jsonwebtoken';

const salt = 10;

export const verifyMail = (to, mess) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'blake.larson@ethereal.email',
            pass: '9etr5ZqZwN5pZQJj3X'
        }
    });

    let message = {
        from: 'blake.larson@ethereal.email',
        to: to,
        subject: mess.subject,
        text: mess.content,
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

const sercurityPass = async (pass) => {
    const sal = await bcrypt.genSalt(salt);
    const hash = await bcrypt.hash(pass, sal);
    //console.log(hash);
    return hash;
}

export const jwtCheck = async (id, clientToken) => {
    let check = await Token.findOne({ u_id: id });

    if (check) {
        if (check.token == clientToken) {
            return true
        } else {
            return false
        }
    } else {
        let token = await new Token({ u_id: id });
        token.save();

        return token;
    }
}

/* const checkVerify = async (id) => {
    let verifyCheck = await Verify.find({ u_id: id });

    if (!verifyCheck)
        return false;
    else
        return true;
} */


const Login = async (req, res, next) => {
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    console.log(user);

    try {
        if (!user) {
            res.sendStatus(404);
        } else {
            let pass = req.body.password;
            console.log(pass);

            let check = await bcrypt.compare(pass, user.password);
            console.log(check);

            if (check) {
                console.log(200)
                delete user.password;
                res.status(200).send(user);
            } else {
                console.log(433)
                res.sendStatus(433);
            }
        }
    } catch (err) {
        next(err)
    }

    //console.log(user.name)
    //res.sendStatus(500);
}

const forgotPassword = async (req, res, next) => {
    let data = req.body;

    let user = await User.findOne({ email: data.email }).exec();

    console.log(user.name);

    if (!user) {
        res.sendStatus(404);
    } else {
        let pass = await sercurityPass(data.password)


        try {

            user.password = pass;
            user.status = false;

            await user.save();

            let verify = await Verify.findOne({ u_id: user._id });
            let code;

            if (!verify) {
                let verify = new Verify({ u_id: user._id });
                await verify.save();

                code = verify.code;
            } else {
                code = verify.code;
            }

            let mailsending = {
                subject: "confirm email for change password",
                content: `Hi user ${data.name}, we are todoapp team developement. We looking for your request to change password, please relogin and use this code for verify this action!
            ${code}`
            }

            verifyMail(data.email, mailsending);

            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }



}

const createUser = async (req, res, next) => {
    let serPass = await sercurityPass(req.body.password);
    let data = {
        name: req.body.username,
        email: req.body.email,
        password: serPass
    };
    //console.log(data);
    let user = new User(data);

    try {
        await user.save();

        let verify = new Verify({ u_id: user.id });
        await verify.save();

        //console.log(verify);

        let code = verify.code;
        //await jwtCheck(user._id);
        let token = new Token({ u_id: user.id });
        await token.save()

        //console.log(token);

        let mailsending = {
            subject: "confirm email",
            content: `Hi user ${data.name}, we are todoapp team developement.Thanks to verify we service, please relogin and use this code for verify action!
            ${code}`
        }

        verifyMail(data.email, mailsending);

        res.status(200).send(token);
    } catch (err) {
        next(err);
        res.sendStatus(500);
    }
}


const getUserInfomation = async (req, res, next) => {

    try {
        let user = await User.findById(req.params.info);
        if (!user) {
            res.sendStatus(404);
        }
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const UpdateUserInfomation = async (req, res, next) => {
    let data = { ...req.body };

    data.datebirth = data.birth;
    data.name = data.username;

    delete data.username;
    delete data.birth;
    //console.log(data);

    //console.log(req.params.info);


    try {

        let doc = await User.findByIdAndUpdate(req.params.info, data);

        if (!doc) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        res.sendStatus(500)
        next(err)
    }
}

const changePass = async (req, res, next) => {
    try {
        const data = req.body;
        data.password = data.newpass;
        delete data.newpass;
        delete data.confirmpass;

        let user = await User.findById(req.params.info);

        let test = await bcrypt.compare(data.currentpass, user.password);


        if (test == true) {
            await User.findByIdAndUpdate(req.params.info, { password: await sercurityPass(data.password) });
            res.sendStatus(200)
        }

        else {
            console.log("errr");
            res.sendStatus(500);
        }
    } catch (err) {
        res.sendStatus(500)
        console.log(err);
    }
}

const removeUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body.info, (err, doc) => {
            if (err)
                throw new Error(err);
            res.send(doc)
        });
        res.status(200);
    } catch (err) {
        next(err);
    }
}

const updateStatus = async (req, res, next) => {
    let user = await User.findById(req.body.id);

    if (!user) {
        res.sendStatus(404);
    } else {
        try {
            user.status = true;
            await user.save();
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }
}

const UserController = {
    Login,
    createUser,
    UpdateUserInfomation,
    removeUser,
    getUserInfomation,
    forgotPassword,
    changePass,
    updateStatus
};

export default UserController;