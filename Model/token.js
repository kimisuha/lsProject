import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';
dotenv.config();

const schema = mongoose.Schema;

/* const createToken = async () => {
    let tk = await jwt.sign(process.env.JWT_TOKEN, process.env.REFESH_TOKEN);

    return tk;
} */


const tokenSchema = new schema({
    token: {
        type: String,
        required: true,
        /* default: await createToken() */
    },
    u_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: '15m'
    },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

export default Token;