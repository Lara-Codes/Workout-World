const data = require("../data/users.json");
const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


async function addPost(email, title, date, duration, distance, location, subject) {
    const db = await connect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    if (!user.posts) {
        user.posts = [];
    }
    user.posts.push({ title, date, duration, distance, location, subject });

    res.status(201).json({ success: true, message: 'Post created successfully.' });

}

function generateJWT(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}

function verifyJWT(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

module.exports = {
    addPost, generateJWT, verifyJWT
};