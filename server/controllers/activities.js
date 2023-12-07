const express = require('express');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();
const {addPost} = require('../models/activities');
router 
    .post('/addpost', async (req, res, next) => {
        try{
            console.log('here')
            const user = await addPost(req.body.email, req.body.title, req.body.date, req.body.duration, req.body.distance, req.body.location, req.body.subject);
            res.send(user);
        }catch(error){
            next(error)
        }

    })


module.exports = router;