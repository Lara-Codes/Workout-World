
// /**
//  * @typedef {Object} Bank
//  * @property {string} cardExpire
//  * @property {string} cardNumber
//  * @property {string} cardType
//  * @property {string} currency
//  * @property {string} iban
//  */

// /**
//  * @typedef {Object} Coordinates
//  * @property {number} lat
//  * @property {number} lng
//  */

// /**
//  * @typedef {Object} Address
//  * @property {string} address
//  * @property {string} [city]
//  * @property {Coordinates} coordinates
//  * @property {string} postalCode
//  * @property {string} state
//  */

// /**
//  * @typedef {Object} Company
//  * @property {Address} address
//  * @property {string} department
//  * @property {string} name
//  * @property {string} title
//  */

// /**
//  * @typedef {Object} BaseUser
//  * @property {string} firstName
//  * @property {string} lastName
//  * @property {string} maidenName
//  * @property {number} age
//  * @property {string} gender
//  * @property {string} email
//  * @property {string} phone
//  * @property {string} username
//  * @property {string} password
//  * @property {string} birthDate
//  * @property {string} image
//  * @property {string} bloodGroup
//  * @property {number} height
//  * @property {string} macAddress
//  * @property {string} university
//  * @property {Bank} bank
//  * @property {Company} company
//  * @property {string} ein
//  * @property {string} ssn
//  * @property {string} userAgent
//  * @property {string} role
//  */

// /**
//  * @typedef {Object} HasId
//  * @property {number} id
//  */

// /**
//  * @typedef {BaseUser & HasId} User
//  */

// /**
//  * @type { {users: User[]} }
//  */
const data = require("../data/users.json");
const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// /**
//  * @returns {User[]} An array of products.
//  */
async function getAll() {
    const db = await connect();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find().toArray();
    return users;
}

// /**
//  * @param {number} id - The product's ID.
//  */
// function get(id) {
//   const item = data.users.find(x => x.id === id);
//   if (!item) {
//     throw new Error('User');
//   }
//   return item
// }

// /**
//  * @param {BaseUser} values - The user to create.
//  * @returns {User} The created user.
//  */
async function register(email, password, firstName, lastName) {
  const trimmedEmail = email.trim(); // get rid of empty spaces and weird characters 
  const trimmedPassword = password.trim();
  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();

  // Check if any of the trimmed values are empty
  if (!trimmedEmail || !trimmedPassword || !trimmedFirstName || !trimmedLastName) {
    throw new Error('Please fill out all fields.');
  }
  // const item = data.users.find(x => x.email === email);
  const db = await connect();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ trimmedEmail });

  if (user) {
    throw new Error('Email already registered.');
  }

  // Insert new user into the database
  const newUser = {
    email: trimmedEmail,
    password: trimmedPassword,
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    role: 'user'
    // Add other properties as needed
  };

  const result = await usersCollection.insertOne(newUser);
  if (result.acknowledged === true) {
    return newUser;
  } else {
    // Registration failed
    throw new Error('Failed to register user.');
  }
}

// /**
//  * @param {string} email
//  * @param {string} password
//  * @returns { Promise< { user: User, token: string}> } The created user.
//  */
async function login(email, password) {
  if (!email || !password) {
    throw new Error('Please fill out all fields.');
  }
  const db = await connect();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  } else if (user.password !== password) {
    throw new Error('Wrong password');
  } else {
    const userlog = { ...user, password: undefined, admin: true };
    const token = await generateJWT(user);
    return { user: userlog, token };
  }
}

async function updateasadmin(ogemail, email, firstName, lastName, role, password){
  const db = await connect()
  const usersCollection = db.collection('users')
  const user = await usersCollection.findOne({ email: ogemail });
  if (!user) {
    throw new Error('User not found');
  } 
  const updateFields = {
    email: email || user.email, // If email is not provided, use the existing email
    password: password || user.password, // If password is not provided, use the existing password
    firstName: firstName || user.firstName, // If firstName is not provided, use the existing firstName
    lastName: lastName || user.lastName, // If lastName is not provided, use the existing lastName
    role: role || user.role
  };
  const result = await usersCollection.updateOne(
    { email: ogemail },
    { $set: updateFields }
  );

  if (result.modifiedCount === 0) {
    throw new Error('User not updated');
  }else{
    return { success: true, message: 'User updated successfully.' };
  }
}

async function edit(ogemail, email, password, firstName, lastName) {
  const db = await connect()
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email: ogemail });
  if (!user) {
    throw new Error('User not found');
  }
  if (email) {
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { email } }
    );
    return { success: true, message: 'Email updated successfully.' };
  }

  if (password) {
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { password } }
    );
    return { success: true, message: 'Password updated successfully.' };
  }
  if (firstName) {
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { firstName } }
    );
    return { success: true, message: 'Name updated successfully.' };
  }
  if (lastName) {
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastName } }
    );
    return { success: true, message: 'Name updated successfully.' };
  }
  if(!email && !password && !firstName && !lastName){
    return {success: false, message: 'Nothing to update.'}
  }
}

async function remove(email) {
  const db = await connect()
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }

  const result = await usersCollection.deleteOne({ email: email });

  if (result.deletedCount === 0) {
    throw new Error('User not deleted');
  }

  return { success: true, message: 'User deleted successfully.' };
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
  getAll, remove, login, register, edit, updateasadmin, generateJWT, verifyJWT
};