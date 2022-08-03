import Post from "../Model/post.js";

const shareTo = async (req, res, next) => {
    //let listToShare = req.body;
    try {
        await Post.findOneAndUpdate({ "Post._id": "" }, (err, doc) => {
            if (err)
                throw new Error(err);
            res.send(doc);
        });
    } catch (err) {
        next(err);
    }
}

const changeShareList = async (req, res, next) => {
    let doc;

    try {
        await Post.findOne(req.body.id).then((res) => doc = res);

        doc.sharelist = req.body.sharechange;

        await doc.save();
        res.send(doc);
    } catch (err) {
        next(err);
    }
}

const getPost = async (req, res, next, err) => {
    let post;

    try {
        await Post.findById(req.params.postinfo).then((res) => { post = res });
        if (!post)
            throw new Error(err)

        res.send(post);
    } catch (err) {
        next(err);
    }

}

const createPost = async (req, res, next) => {
    const post = new Post(req.body.postinfo);

    try {
        await post.save();
        res.status(200);
    } catch (err) {
        next(err);
    }
}

const modifiedPost = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.postinfo, req.body, (err, doc) => {
            if (err)
                throw new Error(err);
            res.send(doc);
        });
    } catch (err) {
        next(err);
    }
}

const removePost = async (req, res, next) => {
    try {
        await Post.findOneAndDelete(req.body.postinfo, (err, doc) => {
            if (err)
                throw new Error(err);
            res.send(doc);
        });
    } catch (err) {
        next(err);
    }
}


const pagination = async (req, res, next) => {
    try {
        await Post.find(req.body.id, { skip: req.body.perpage * req.body.page, limit: req.body.perpage }, (err, docs) => {
            if(err)
                throw new Error(err);
            res.send(docs);
        });
    } catch (error) {
        next(err);
    }
}

const postController = {
    shareTo,
    changeShareList,
    getPost,
    createPost,
    modifiedPost,
    removePost,
    pagination
};

export default postController;