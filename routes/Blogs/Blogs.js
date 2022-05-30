const express = require('express');
const { authenticate } = require('../../Components/authenticate');
const app = express.Router();
const BlogsController = require('../../Controllers/Blogs/Blogs')

app.post("/post",authenticate, BlogsController.post);
app.get("/getPosts",authenticate, BlogsController.getPosts);
app.delete("/deletePost",authenticate, BlogsController.deletePost);


module.exports = app;