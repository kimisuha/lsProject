import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true
    },
    email: {
        type: String,
        requirde: true,
        min: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 2
    },
    datebirth: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model("User", UserSchema);
export default User;