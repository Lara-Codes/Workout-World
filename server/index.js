const path = require('path')
const express = require("express");
const productController = require('./controllers/products');
const userController = require('./controllers/users');
const app = express(); 

const mongo = require('./models/mongo')

const PORT = 3000; 

app 
    .use('/', express.static(path.join(__dirname, '../client/dist')))
    .use(express.json())

    // CORS
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    })

    .use('/api/v1/products', productController)
    .use('/api/v1/users', userController)

    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })

// if you arent changing the state, maybe use a get. 
// if you're creating a new detail/adding info, post. Like if ur submitting a form and are adding info to the state of the server. 
// if ur replacing info, use PUT. 
// if you arent replacing, but changing, use PATCH. 
// if you are deleting, use DELETE. 

// we can map everything out but it might get long/heavy. instead use modules. 

app.listen(PORT, () => {
    console.log(`2: Server is running at http://localhost:${PORT}`)
})

console.log('3: End of file, waiting for requests...')