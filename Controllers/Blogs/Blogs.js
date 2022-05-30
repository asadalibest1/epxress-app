const express = require('express');
const BlogsModel = require('../../Model/Blogs');
class BlogsController {


    post = async (req, res) => {
        try {
            const result = await BlogsModel.Post(req, res);
            res.status(200).send(result);
        } catch (error) {
            console.log({ Error: error });
            res.status(403).send({ Error: error });
        }

    }

    getPosts = async (req, res) => {
        try {
            const result = await BlogsModel.GetPost(req);
            res.status(200).send(result);
        } catch (error) {
            console.log({ Error: error });
            res.status(403).send({ Error: error });
        }

    }
    deletePost = async (req, res) => {
        try {
            const result = await BlogsModel.DeletePost(req);
            res.status(200).send(result);
        } catch (error) {
            console.log({ Error: error });
            res.status(403).send({ Error: error });
        }

    }
}

module.exports = new BlogsController();