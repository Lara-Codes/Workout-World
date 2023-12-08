const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

async function addPost(email, title, date, duration, distance, location, subject) {
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
                posts: [
                    ...(user.posts || []), // Preserve existing posts (if any)
                    { title, date, duration, distance, location, subject }
                ]
            }
        }
    );
    if (result.matchedCount === 0) {
        return { success: false, message: 'Post not added.' };
    }

    return { success: true, message: 'Post added successfully.' };
}

async function getAllPosts(email) {
    const db = await connect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const posts = user.posts || []; // Access the posts field or default to an empty array

    return { success: true, posts };
}

async function deletePost(email, newArray) {
    try {
        const db = await connect();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        await usersCollection.updateOne({ email }, { $set: { posts: newArray } });

        // Extract the updated posts array from the newArray parameter
        const updatedPosts = newArray;

        return { success: true, posts: updatedPosts };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, message: 'Error deleting post.' };
    }
}

async function getAll() {
    const db = await connect();
    const usersCollection = db.collection('users');
  
    try {
      const cursor = await usersCollection.find();
      const allUsersPosts = await cursor.toArray();
  
      const posts = allUsersPosts.flatMap(user => {
        const { firstName, lastName, email, posts } = user;
  
        // Use the optional chaining operator to handle cases where 'posts' is undefined
        return (posts ?? []).map(post => ({
          firstName,
          lastName,
          email,
          ...post // Spread the existing post properties
        }));
      });
  
      return { success: true, posts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { success: false, message: 'Error fetching posts.' };
    }
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
    addPost, getAllPosts, deletePost, getAll, generateJWT, verifyJWT
};