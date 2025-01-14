const express = require('express');
const { getAll, remove, login, register, edit, updateasadmin, userSearch } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router

    .get('/', requireUser(true), (req, res, next) => {
    res.send(getAll());
    })

    .post('/userdata', requireUser(true), async (req, res, next) => {
        try {
            const allusers = await getAll();
            res.json({ success: true, users: allusers });
        } catch (error) {
            next(error);
        }
    })

    .post('/param', async(req, res, next) => {
        try{
            const searchresult = await userSearch(req.body.param); 
            res.json({success: true, users: searchresult})
        }catch(error){
            next(error); 
        }
    })

    .post('/usersdata', async (req, res, next) => {
        try {
            const allusers = await getAll();
            res.json({ success: true, users: allusers });
        } catch (error) {
            next(error);
        }
    })
    // })
    .post('/signup', async (req, res, next) => {
        try{
            const user = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
            res.send(user);
        }catch(error){
            next(error)
        }

    })

    .post('/login', async (req, res, next) => {
        try {
        const user = await login(req.body.email, req.body.password);
        res.send(user);
        } catch (error) {
        // Pass the error to Express's error handling middleware
        next(error);
        }
    })

    .post('/edit', requireUser(false), async (req, res, next) => {
        try{
            const update = await edit(req.body.ogemail, req.body.email, req.body.password, req.body.firstName, req.body.lastName);
            res.send(update)
        }catch(error){
            next(error)
        }
    })

    .post('/users', requireUser(true), async (req, res, next) => {
        try {
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    })

    .post('/editasadmin', requireUser(true), async(req, res, next) => {
        try{
            const update = await updateasadmin(req.body.ogemail, req.body.email, req.body.firstName, req.body.lastName, req.body.role, req.body.password)
            res.json({ success: true });
        }catch(error){
            next(error)
        }
    })

    .post('/delete', requireUser(true), async(req, res, next) => {
        try{
            const removeuser = await remove(req.body.email)
            res.json({success: true})
        }catch(error){
            next(error)
        }
    })

module.exports = router;