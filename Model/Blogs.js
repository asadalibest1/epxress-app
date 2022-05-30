const express = require('express');
const { db } = require('../DB/DB');
// const xml = require('xml');
const MongoDb = require('mongodb');

class BlogsModel {
    Post = async (req, res) => {
        console.log('req.body', req.body);
        try {
            const result = await db('posts').insertOne(req.body)
            console.log(result);
            return Promise.resolve(result);
            // res.status(200).send(xml)


        } catch (error) {
            console.log(error);
            return Promise.reject(error);

        }
    }


    GetPost = async () => {
        try {
            const result = await db('posts').find({}).toArray();
            console.log(result);
            return Promise.resolve(result);

        } catch (error) {
            console.log(error);
            return Promise.reject(error);

        }
    }

    DeletePost = async (req) => {
        try {
            const result = await db('posts').deleteOne({ _id: new MongoDb.ObjectId(req.body.id) });
            console.log(result);
            return Promise.resolve(result);

        } catch (error) {
            console.log(error);
            return Promise.reject(error);

        }
    }


}

module.exports = new BlogsModel();
