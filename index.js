import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import router from './Routes.js'
import { passportStragety } from './passportStragety.js'


const app = express()

const port = process.env.PORT || 5000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE))
//app.use(passportStragety);

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

const list = process.env.PAGE_LISTEN ? process.env.PAGE_LISTEN.split(',') : []
/* 
const option = {
    origin: (origin, callback) => {
        if (!origin || list.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("not available"));
        }
    },
    Credential: true
}; */


app.use(cors());

app.use(router);



app.listen(port, () => console.log('> Server is up and running on port : ' + port))