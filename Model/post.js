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
    sharelist: [{
        type: mongoose.Schema.Types.ObjectId
    }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;