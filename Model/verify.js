import mongoose from "mongoose";

const Schema = mongoose.Schema;


const verifySchema = new Schema({
    u_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    code: {
        type: Number,
        require: true,
        default: (Math.random() * 100000).toFixed()
    },
    expireAt: {
        type: Date,
        /* Defaults 7 days from now */
        default: Date.now(),
        /* Remove doc 60 seconds after specified date */
        expires: '5m'
    }
}, { timestamps: true });

const Verify = mongoose.model('Verify', verifySchema);
export default Verify;