const path = require('path')
const express = require('express');
require('dotenv').config();
const userController = require('./controllers/users');
const activityController = require('./controllers/activities');
const todoController = require('./controllers/todo')
const { parseAuthorizationToken, requireUser } = require('./middleware/authorization');
const app = express();
const PORT = process.env.PORT ?? 3000;

console.log(`The best class at SUNY New Paltz is ${process.env.BEST_CLASS}`);

app
    .use('/', express.static(path.join( __dirname, '../client/dist/') ) )
    .use(express.json())

    // CORS
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if(req.method === 'OPTIONS') {
            return res.send(200);
        }
        next();
    })

    .use(parseAuthorizationToken)

    .use('/api/v1/users', userController)
    .use('/api/v1/activities', activityController)
    .use('/api/v1/todo', todoController)

    .get('*', (req, res) => {
        res.sendFile(path.join( __dirname, '../client/dist/index.html') )
    });

app
    .use((err, req, res, next) => {
        console.error(err);
        res
            .status(err?.status || 500)
            .json({ message: err?.message || err });
    })


console.log('1: Trying to start server...');

app.listen(PORT, () => {
    console.log(`2: Server is running at http://localhost:${PORT}`);
});

console.log('3: End of file, waiting for requests...');