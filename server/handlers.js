"use strict";

const { cloudinary } = require('./utils/cloudinary')
const { MongoClient } = require("mongodb");
// const request = require('request-promise');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const uploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'vincent_english',
        });
        console.log(uploadResponse);
        res.status(201).json({ status: 201, data: uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body.data, message: err.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const fileStr = req.params.id;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.destroy(fileStr);
        console.log(uploadResponse);
        res.status(200).json({ status: 200, data: uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body.data, message: err.message });
    }
};

const addQuiz = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("vincentenglish");
        console.log("connected!");
        // req.body._id = uuidv4(); 
        req.body.questions = []; 
        const result1 = await db.collection("quizzes").insertOne(req.body);
        client.close();
            console.log("disconnected!");
            res.status(201).json({ status: 201, data: result1 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
}

const getQuizzes = async (req, res) => {
    try {
        // if (req.params.userId !== req.auth.payload.sub ) {
        //     return res.status(401).json({status: 401, data: null, message: "Unauthorized"})
        // }
        const client = new MongoClient(MONGO_URI, options);
        // const userId = req.params.userId
        await client.connect();
        const db = client.db("vincentenglish");
        console.log("connected!");
        const result = await db.collection("quizzes").find().toArray();
        res.status(200).json({ status: 200, data: result } )   
        client.close();
        console.log("disconnected!");
    } catch (err) {
        return res.status(500).json({status: 500, data: "error", message: err.message})
    }  
}

const getQuizById = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        const _id = req.params.quizId
        await client.connect();
        const db = client.db("vincentenglish");
        console.log("connected!");
        const result = await db.collection("quizzes").findOne({ _id })
        !result 
            ? res.status(404).json({ status: 404, data: null, message: "Not found" })
            // : result.userId !== req.auth.payload.sub 
            // ? res.status(401).json({status: 401, data: null, message: "Unauthorized"})
            : res.status(200).json({ status: 200, data: result })
        client.close();
        console.log("disconnected!");
    } catch (err) {
        return res.status(500).json({status: 500, data: "error", message: err.message})
    }  
}

const updateQuiz = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("vincentenglish");
        console.log("connected!");
        const formData = req.body;
        const _id = req.params.quizId; 
        const result = await db.collection("quizzes").findOneAndUpdate({ _id }, { $set: formData }, { returnDocument: 'after' });

        // if (result.userId !== req.auth.payload.sub ) {
        //     return res.status(401).json({status: 401, data: null, message: "Unauthorized"})
        // }
        client.close();
            console.log("disconnected!");
            res.status(200).json({ status: 200, data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
}

module.exports = {
    uploadImage,
    deleteImage,
    addQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz
};