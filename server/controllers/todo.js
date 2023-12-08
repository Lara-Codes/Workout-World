const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const {addTask, getAllTasks, removeTask, editstate, editdescription} = require('../models/todo');
// Example middleware function for getting all todos
router
  .post('/add', async (req, res, next) => {
    try {
      const add = await addTask(req.body.email, req.body.completed, req.body.description)
      res.json({ success: true, add: add });
    } catch (error) {
      next(error);
    }
  })

  .post('/taskdata', async(req, res, next) => {
    try{
        const alltasks = await getAllTasks(req.body.email);
        res.json({ success: true, tasks: alltasks });
    }catch(error){
        next(error)
    }
  })

  .post('/removetask', async(req, res, next) => {
    try{
      const removetask = await removeTask(req.body.email, req.body.description); 
      res.json({success: true})
    }catch(error){
      next(error)
    }
  })

  .post('/edittaskstate', async (req, res, next) => {
    try{
      const edittaskstate = await editstate(req.body.email, req.body.description, req.body.completed)
      res.json({success: true})
    }catch(error){
      next(error)
    }
  })

  .post('/edittaskdescription', async (req, res, next) => {
    try{
      const edittaskdescription = await editdescription(req.body.email, req.body.olddescription, req.body.newdescription)
      res.json({success: true})
    }catch(error){
      next(error)
    }
  })

module.exports = router;
