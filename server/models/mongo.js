
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://i8gaQVrKXJBYtc7A:i8gaQVrKXJBYtc7A@cluster0.apwtkx3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const products = await client.db("amazify").collection("products").find().toArray();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log({products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);