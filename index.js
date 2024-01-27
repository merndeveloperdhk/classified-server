const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000 ;

//Middleware
app.use(cors());
app.use(express.json());

//from gmail: merndevelpler@gmail.com


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ecommerceWebsite:Ecommerce1200Dhaka@cluster0.9bn6hyg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allProductsCollection = client.db('ecommerce').collection('allProducts');
    const roomsCollection = client.db('ecommerce').collection('rooms');

    //Get aoo products
    app.get('/allProducts', async(req, res)=>{
        
        const result = await allProductsCollection.find().project({name:1, category:1}).toArray();
        res.send(result)
    })

    app.get('/menswear', async(req, res)=>{
        const search = {category:"Men's Boot"};
        const result = await allProductsCollection.find(search).toArray();
        res.send(result)
    })
    // Rooms
    app.get('/rooms', async(req, res) => {
      const result = await roomsCollection.find().toArray();
      res.send(result)
    })
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('Ecommerce site server is running')
})

app.listen(port, ()=>{
    console.log(`Ecommerce site server is running on port ${port}`);
})