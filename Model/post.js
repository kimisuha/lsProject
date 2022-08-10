import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        required: true,
        type: String,
        min: 4,
        max: 50
    },
    content: {
        required: true,
        type: String,
        min: 2, 
        max: 5000
    },
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    dayend: {
        type: Date,
        required: true,
        default: new Date()
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    sharelist: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
});


const Post = mongoose.model('Post', postSchema);

export default Post;