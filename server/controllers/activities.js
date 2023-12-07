const express = require('express');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();
const {addPost, getAllPosts, deletePost} = require('../models/activities');
router 
    .post('/addpost', async (req, res, next) => {
        try{
            const user = await addPost(req.body.email, req.body.title, req.body.date, req.body.duration, req.body.distance, req.body.subject, req.body.location);
            res.send(user);
        }catch(error){
            next(error)
        }
    })

    .post('/postdata', async(req, res, next) => {
        try{
            const allposts = await getAllPosts(req.body.email);
            res.json({ success: true, posts: allposts });
        }catch(error){
            next(error)
        }
    })

    .post('/delete', async(req, res, next) => {
        try{
            const remove = await deletePost(req.body.email, req.body.newArray); 
            res.json({success: true})
        }catch(error){
            next(error)
        }
    })

    .post('/edit', async(req, res, next) => {
        const edit = await editPost(req.body.index, )
    })


module.exports = router;