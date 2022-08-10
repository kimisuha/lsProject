import Post from "../Model/post.js";
import User from "../Model/user.js";
import mongoose from "mongoose";

const shareTo = async (req, res, next) => {
    //let listToShare = req.body;
    try {
        let userId = await User.findOne({ email: req.body.shareAccount });
        console.log(req.params.id);
        if (!userId) {
            res.sendStatus(404);
        } else {
            //console.log(userId._id);
            await Post.findById(req.params.id).then((res) => {
                res.sharelist.push(mongoose.Types.ObjectId(userId._id));
                res.save();

            });
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err);
        next(err);
        res.sendStatus(500);
    }
}

const getShareList = async (req, res, next) => {
    try {
        let list = Post.findById(req.params.id);

        if (!list) {
            res.sendStatus(404);
        } else {
            let name = []
            for (let i = 0; i < list.length; i++) {
                name = await User.findById(list[i].author).then((user) => {
                    /* name.push(user.name); */
                    return user.name;
                });

                //console.log(name);
            }
            list.concat(name);
            console.log(list);

            res.status(200).send(list);
        }
    } catch (err) {
        console.log(err);
        next(err);
        res.sendStatus(500)
    }
}

const changeShareList = async (req, res, next) => {
    //console.log(req.body);

    try {
        await Post.findById(req.params.id).then((todo) => {
            let index = todo.sharelist.indexOf(req.body.id);
            todo.sharelist.splice(index, 1);
            todo.save();

            res.sendStatus(200);
        });

    } catch (err) {
        console.log(err);
        next(err);
        res.sendStatus(500);
    }
}

const getPost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.headers.postid);
        //console.log(post)

        if (!post) {
            res.sendStatus(404);
        } else {
            res.status(200).send(post)
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

const createPost = async (req, res, next) => {
    try {
        //console.log(req.body);
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            dayend: req.body.dayend,
            author: req.body.id,
            sharelist: []
        });

        await post.save();
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

const modifiedPost = async (req, res, next) => {
    console.log(req.body);
    try {
        let post = await Post.findByIdAndUpdate(req.body.idpost, {
            title: req.body.title,
            content: req.body.content
        });

        if (!post) {
            res.status(404);
        } else {
            //console.log(post);
            res.status(200).send(post);
        }
    } catch (err) {
        next(err);
        res.status(500);
    }
}

const removePost = async (req, res, next) => {
    console.log(req.headers.postid);
    try {
        let post = await Post.findOne({ _id: req.headers.postid }).deleteOne();
        if (!post) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        next(err);
        res.sendStatus(200);
    }
}

const getName = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let name = await User.findById(arr[i].author).select("User.name");
        arr[i].name = name;;
    }

    return arr;
}

const pagination = async (req, res, next) => {
    try {

        let term = await Post.find();

        let listPost = term.filter((item) => {
            if (item.sharelist.indexOf(req.params.info) != -1 || item.author == req.params.info)
                return item;
        });

        if (!listPost)
            res.sendStatus(404);
        else {
            let name = [];

            for (let i = 0; i < listPost.length; i++) {
                await User.findById(listPost[i].author).then((user) => {
                    name.push(user.name);
                });

                //console.log(name);
            }
            //console.log(name);

            res.status(200).send({ listPost, name })
        }
    } catch (err) {
        console.log(err);
        next(err);
        res.sendStatus(500);
    }
}

const checkStatus = async (req, res, next) => {

    // console.log(req.body.id);
    try {

        let post = await Post.findByIdAndUpdate(req.body.id, { status: true });
        if (!post) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
        //console.log(post.status);


    } catch (err) {
        console.log(err)
        next(err)
        res.sendStatus(500);
    }
}


const filter = async (req, res, next) => {
    if (req.params.filter == 'today') {
        try {
            // console.log(req.body.dayend)
            let data = await Post.find(req.body.id)
                .where('dayend').equals(req.body.dayend)

            //console.log(data);

            if (!data) {
                res.sendStatus(404);
            } else {
                res.status(200).send(data);
            }
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }
    else if (req.params.filter == 'yesterday') {
        try {
            // console.log(req.body.dayend)
            let data = await Post.find(req.body.id)
                .where('dayend').equals(req.body.dayend)

            //console.log(data);

            if (!data) {
                res.sendStatus(404);
            } else {
                res.status(200).send(data);
            }
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }
    else if (req.params.filter == 'thisweek') {
        try {
            // console.log(req.body.dayend)
            let data = await Post.find(req.body.id)
                .where('dayend').gte(req.body.dayend).lte(req.body.limit)
            //console.log(data);

            if (!data) {
                res.sendStatus(404);
            } else {
                res.status(200).send(data);
            }
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }
    else {
        //console.log(req.body.u_id)
        try {
            let term = await Post.find();

            /* let listPost = term.map((item, i) => {
                if (item.sharelist.indexOf(req.body.u_id) != -1){
                    //console.log(item)
                    return item;
                }
                else
                    term.splice(i, 1);
            }) */

            let listPost = term.filter((item) => {
                if (item.sharelist.indexOf(req.body.u_id) != -1) {
                    //console.log(item)
                    return item;
                }
            })
            //console.log(listPost);

            if (!listPost) {
                res.sendStatus(404);
            } else {
                res.status(200).send(listPost);
            }
        } catch (err) {
            console.log(err);
            next(err);
            res.sendStatus(500);
        }
    }

}

const sortBy = async (req, res, next) => {

    try {
        if (req.params.sort == 'increase') {
            let term = await Post.find().sort({ dayend: 1 });

            let listPost = term.filter((item) => {
                if (item.sharelist.indexOf(req.headers.id) != -1 || item.author == req.headers.id)
                    return item;
            });


            if (!listPost)
                res.sendStatus(404);
            else
                res.status(200).send(listPost);
        }

        else if (req.params.sort == 'decrease') {
            let term = await Post.find().sort({ dayend: -1 });

            let listPost = term.filter((item) => {
                if (item.sharelist.indexOf(req.headers.id) != -1 || item.author == req.headers.id)
                    return item;
            });


            if (!listPost)
                res.sendStatus(404);
            else
                res.status(200).send(listPost);
        }
        else {
            let term = await Post.find().sort({ title: 1 });

            let listPost = term.filter((item) => {
                if (item.sharelist.indexOf(req.headers.id) != -1 || item.author == req.headers.id)
                    return item;
            });


            if (!listPost)
                res.sendStatus(404);
            else
                res.status(200).send(listPost);
        }

    } catch (err) {
        console.log(err);
        next(err);
        res.sendStatus(500);
    }

}

const postController = {
    shareTo,
    changeShareList,
    getPost,
    createPost,
    modifiedPost,
    removePost,
    pagination,
    filter,
    checkStatus,
    getShareList,
    sortBy
};

export default postController;