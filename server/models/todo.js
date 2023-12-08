const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

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

async function addTask(email, completed, description) {
    const db = await connect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    const result = await usersCollection.updateOne(
        { email },
        {
            $set: {
                tasks: [
                    ...(user.tasks || []), // Preserve existing posts (if any)
                    { completed, description }
                ]
            }
        }
    );
    if (result.matchedCount === 0) {
        return { success: false, message: 'Task not added.' };
    }

    return { success: true, message: 'Task added successfully.' };
}

async function getAllTasks(email) {
    const db = await connect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const tasks = user.tasks || []; // Access the posts field or default to an empty array

    return { success: true, tasks };
}

async function removeTask(email, description) {
    try {
        const db = await connect(); // Assuming you have a function to connect to the database
        const usersCollection = db.collection('users');

        // Find the user by email
        const user = await usersCollection.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }
        await usersCollection.updateOne(
            { email },
            {
                $pull: {
                    tasks: { description }
                }
            }
        );
        console.log('Task removed successfully');

    } catch (error) {
        console.error('Error removing task:', error);
    }
}

async function editstate(email, description, completed){
    const db = await connect(); // Assuming you have a function to connect to the database
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const result = await usersCollection.updateOne(
        { email, 'tasks.description': description }, // Find the user by email and the task by description
        { $set: { 'tasks.$.completed': completed } } // Update the completed field of the matched task
    );

    if (result.matchedCount === 0) {
        throw new Error('Task not found for the specified user and description');
    }

    console.log('Task state updated successfully');
    console.log('Task removed successfully');
}

async function editdescription(email, olddescription, newdescription) {
    const db = await connect();
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
        { email, 'tasks.description': olddescription },
        { $set: { 'tasks.$.description': newdescription } }
    );

    if (result.matchedCount === 0) {
        throw new Error('Task not found for the specified user and description');
    }

    console.log('Task description updated successfully');
}

module.exports = {
    addTask, getAllTasks, removeTask, editstate, editdescription, generateJWT, verifyJWT
};