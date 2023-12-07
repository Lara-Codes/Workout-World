const express = require('express');
const router = express.Router();
const {addPost, getAllPosts, deletePost, getAll} = require('../models/activities');
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

    .post('/getall', async(req, res, next) => {
        try{
            const getall = await getAll(); 
            res.json({success: true, posts: getall})
        }catch(error){
            next(error)
        }
    })


module.exports = router;