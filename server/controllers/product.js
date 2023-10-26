/* B"H */

const express = require('express');
const router = express.Router() // in root of app better to instantiate express as a function. Router is basically the same as app.

router.get('/', (req, res, next) => {
    res.send([
        {id: 1, name: 'Product 1'}, 
        {id: 2, name: 'Product 2'}, 
    ]);
})
.get('/search', (req, res, next) => {
    res.send('Search for products')
})
.get('/:id', (req, res, next) => {
    res.send({id: req.params.id, name: 'Product 1'})
})

module.exports = router; 