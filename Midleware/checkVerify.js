import User from "../Model/user.js"

export const checkverify = async (req, res, next) => {
    let user = await User.findById(req.params.info);

    if (!user) {
/*         console.log(404);
 */        res.sendStatus(404);
    }
    else if (user.status == true) {
/*         console.log(200);
 */        next();
    }
    else {
/*         console.log(403);
 */        res.sendStatus(403);
    }

}