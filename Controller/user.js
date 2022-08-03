import User from "../Model/user.js";


const checkLogin = async (req, res, next) => {
}

const forgotPassword = (req, res, next) => {
    
}

const createUser = async (req, res, next) => {

    let user = new User(req.body.info);

    try {
        await user.save();
    } catch (err) {
        next(err);
    }
}


const getUserInfomation = async (req, res, next) => {
    let user;

    try {
        await User.findById(req.params.info).then((res) => { user = res });
        if (!user)
            throw new Error(user)
        res.send(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const UpdateUserInfomation = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.info, (err, doc) => {
            if (err)
                throw new Error(err);
            res.send(doc)
        });
    } catch (err) {
        next(err)
    }
}

const removeUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body.info, (err, doc) => {
            if(err)
                throw new Error(err);
            res.send(doc)
        });
        res.status(200);
    } catch (err) {
        next(err);
    }
}

const UserController = {
    checkLogin,
    createUser,
    UpdateUserInfomation,
    removeUser,
    getUserInfomation,
    forgotPassword
};

export default UserController;