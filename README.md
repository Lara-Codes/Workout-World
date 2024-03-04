# Workout World

Welcome to Workout World! A new, user-friendly social networking application to track to-do lists, workout goals, workout progress/statistics, and to share progress and daily exercises with friends. Whether you are a newbie gym-goer, a casual jogger, or a professional bodybuilder, Workout World can help you meet your goals and stay motivated daily. 

### Stack
- Frontend:
  - Vue.js
  - Bulma CSS

- Backend:
  - Node.js
  - Express.js

- Database:
  - MongoDB

## Table of Contents

- [Project Name](#project-name)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction
Welcome to Workout World! It all started when a couple of my friends from my Computer Science class invited me to the gym. Going to the gym with tech people is always fun. We refer to the stacked weight plates on the barbell as the Tower of Hanoi, and apply binary search when figuring out our ideal weight for an exercise. 

As me and my nerdy gym friends continued to get stronger, we started to graph our progress using Excel and update eachother on Discord. This is where Workout World came in. What if there was a centralized location for all of us to share progress, create workout plans/to-do lists, and track statistics all in one location? 

With Workout World, we can do all of that. Feel free to browse the code and make a contribution if you are interested and have an idea for an improvement! 

## Features

### 1. To-Do lists 
Write to-do lists for daily goals. View current tasks, completed tasks, and all tasks in separate tabs. 

### 2. Personal Activity
Add workouts. Includes title, date, duration, distance, location, and workout type fields. 

### 3. Statistics
View average distance, duration, pace, and calories burnt for the day, the week, and all time. 

### 3. Friends Activity 
View activities logged by friends. 

### 4. Search 
Search registered users. 

### 5. Admin page 
Admin page to delete users, edit users, and change privileges to admin or user.   

## Getting Started

### Prerequisites 
You must have node.js and npm package manager installed on your machine. Installation instructions can be found [here]([URL](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).
. 

### Creating a MongoDB Atlas Account
To use MongoDB as your database for this application, you'll need to create an account with MongoDB Atlas. Follow these steps to get started:

1. **Sign Up**: 
   - Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and click on the "Start Free" button.
   - Follow the prompts to create a new account.

2. **Create a Cluster**:
   - After signing in, click on the "Build a Cluster" button to create a new cluster.
   - Choose your preferred cloud provider, region, and cluster configuration. You can use the free tier for testing purposes.

3. **Create a Users Collection**:

To store data in MongoDB for this application, you'll need to define a collection schema that outlines the structure of each document. 

Each document in the `users` collection should have the following attributes:

- **_id**: ObjectId - A unique identifier for the user.
- **email**: String - The email address of the user.
- **password**: String - The hashed password of the user.
- **firstName**: String - The first name of the user.
- **lastName**: String - The last name of the user.
- **role**: String - The role or permissions assigned to the user (e.g., "user", "admin").
- **posts**: Array of ObjectIds - An array of references to the user's posts.

### Example Document:

```json
{
  "_id": "6571f90a17dd2b12c1a2b35a",
  "email": "johnnyappleseed@gmail.com",
  "password": "johnny", // Note: Password should be hashed for security
  "firstName": "John",
  "lastName": "Appleseed",
  "role": "user",
  "posts": [
    ObjectId("123456789012345678901234"), // Reference to a post document
    ObjectId("234567890123456789012345")  // Reference to another post document
  ]
}
```

4. **Obtain the Connection URI**:
   - Once your cluster is created, navigate to the "Connect" tab in the MongoDB Atlas dashboard.
   - Choose "Connect Your Application" and copy the provided connection URI. This will be used as an environment variable. 

### Example Connection URI:

```plaintext
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database>
```

### Installation

1. **Clone the Repository**: 
   Clone the Workout World repository to your local machine using Git:
``` bash
  git clone https://github.com/Lara-Codes/Workout-World.git
```
2. **Navigate to client directory and install dependencies**:
   ```bash
   
   cd client
   npm i

3. **Navigate to server directory and install dependencies**:
  ```bash
  cd server
  npm run build
  npm i
```
4. **Environment Variables**:
  In the client directory, create a .env file and add the following line:
```plaintext

VITE_API_ROOT=http://localhost:3000/api/v1
```
  In the server directory, create a .env file and add the following lines:
  You'll need to create a MongoDB account and create a database. Details above. 
```plaintext

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database>
MONGO_DB_NAME=myDBname
JWT_SECRET=myJWTSecret
JWT_EXPIRES_IN=3h
```

5. **Start the Development Server**:
```bash
# Terminal 1
# Navigate to the project directory
cd client

# Start the frontend server
npm run dev

# Terminal 2
# Navigate to the project directory
cd your-project

# Start the backend server
cd server
npm start
```
Now, open your browser and follow the link displayed on the frontend server. Happy exercising!


## Contributing

I welcome contributions from the community! Whether you're a developer, designer, tester, or documentation enthusiast, there are many ways to contribute to our project. Here's how you can get involved:

### Reporting Bugs

If you encounter any bugs or issues while using our application, please let us know by [opening an issue]([https://github.com/your-username/your-project/issues](https://github.com/Lara-Codes/Workout-World/issues)) on GitHub. Be sure to provide detailed steps to reproduce the issue and include any relevant screenshots or error messages.

### Suggesting Enhancements

Have an idea for a new feature or improvement? I'd love to hear it! [Open an issue]([[https://github.com/your-username/your-project/issues](https://github.com/Lara-Codes/Workout-World/issues](https://github.com/Lara-Codes/Workout-World/issues))) on GitHub and share your thoughts. I'm always looking for ways to make my applications better, and your feedback is invaluable.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


