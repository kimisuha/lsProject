import express from 'express'
import mongoose from 'mongoose'


import router from './Routes.js'


const app = express()

const port = process.env.PORT || 5000

try {
    mongoose.connect("mongodb+srv://NUSintern:NUSinternjob123456@cluster0.qrdjj38.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected");
} catch (error) {
    console.log(error);
}

app.set("view engine", "pug");


app.use(router);



app.listen(port, () => console.log('> Server is up and running on port : ' + port))