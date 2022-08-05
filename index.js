import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

import router from './Routes.js'


const app = express()

const port = process.env.PORT || 5000

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
try {
    mongoose.connect(process.env.MONGODBLINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("connected");
} catch (error) {
    console.log(error);
}

//app.set("view engine", "pug");

/* app.get('/ex', async function (req, res, next) {
    try {
        let ex = new Verify({
            u_id: "62eb82940f3f6f08ac59d3f0"
        });

        await ex.save();
        res.send("ok");
    } catch (err) {
        next(err);
    }
}) */


app.use(router);



app.listen(port, () => console.log('> Server is up and running on port : ' + port))