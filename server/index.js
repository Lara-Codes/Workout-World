// Vanilla node server
const express = require("express");
const productController = require('./controllers/product');
const app = express(); 

const PORT = 3000; 

app.get('/', (req, res) => { // if get do this function, if post do that function, if delete do that function, etc.. 
    res.send('Hello world!');
})
.use('/products', productController);

// if you arent changing the state, maybe use a get. 
// if you're creating a new detail/adding info, post. Like if ur submitting a form and are adding info to the state of the server. 
// if ur replacing info, use PUT. 
// if you arent replacing, but changing, use PATCH. 
// if you are deleting, use DELETE. 

// we can map everything out but it might get long/heavy. instead use modules. 

console.log('1: Trying to start server...')

app.listen(PORT, () => {
    console.log(`2: Server is running at http://localhost:${PORT}`)
})

console.log('3: End of file, waiting for requests...')