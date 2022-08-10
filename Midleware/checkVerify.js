import User from "../Model/user.js"
import * as nodemailer from 'nodemailer';
import { verifyMail } from "../Controller/user.js";
import Verify from "../Model/verify.js";

export const checkverify = async (req, res, next) => {
    let id;

    if (req.params.info) {
        id = req.params.info
    } else {
        id = req.body.id
    }

    
    let user = await User.findById(id);
    console.log(id);
    console.log(user);

    if (!user) {
/*         console.log(404);
 */        res.sendStatus(404);
    }
    else if (user.status === true) {
/*         console.log(200);
 */        next();
    }
    else {
/*         let verify = new Verify({ u_id: user.id });
        await verify.save();

        //console.log(verify);

        let code = verify.code;

        let mailsending = {
            subject: "confirm email",
            content: `Hi user ${user.name}, we are todoapp team developement.you're not verify, please get this code and verifi action!
            ${code}`
        }

        verifyMail(user.email, mailsending) */
        console.log(403);
        res.sendStatus(403);
    }

}