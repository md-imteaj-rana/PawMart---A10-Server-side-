const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 3000;

const app = express()
app.use(cors());

app.use(express.json())


//Mongodb code 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@pawmarta10.t0jzost.mongodb.net/PawMartA10?retryWrites=true&w=majority&appName=PawMartA10`;

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
    
    //await client.connect();

    const database = client.db('pawmartServices');

    const pawmart_services = database.collection('services')
    const orderCollections = database.collection('orders')

    // post or save service to db
    app.post('/service', async(req, res) => {

      const data = req.body;
      const date = new Date();
      data.createdAt = date;

      const result = await pawmart_services.insertOne(data)

      res.send(result)
    })

    // Get services from db 
    app.get('/service', async(req, res) => {
      const {category} = req.query;
      const query = {}
      if(category){
        query.category = category
        
      }
      const result = await pawmart_services.find(query).toArray();
      res.send(result)
    })

    // getting a particular data
    app.get('/service/:id', async(req, res) => {
      const id = req.params

      const query = {_id: new ObjectId(id)}
      const result = await pawmart_services.findOne(query)
      res.send(result)
    })

    // api for my services
    app.get('/MyServices', async(req, res) =>{
      const {email} = req.query
      const query = {email: email}
      const result = await pawmart_services.find(query).toArray()
      res.send(result)
    })

    // api for get updated info
    app.put('/update/:id', async(req, res) =>{
      const data = req.body;
      const id = req.params
      const query = {_id: new ObjectId(id)}

      const updateServices = {
        $set: data
      }

      const result = await pawmart_services.updateOne(query, updateServices)
      res.send(result)
    })

    // delete backend 
    app.delete('/delete/:id', async(req, res) =>{
      const id = req.params
      const query = {_id: new ObjectId(id)}
      const result = await pawmart_services.deleteOne(query)
      res.send(result)
    })

    // Orders to store in my db
    app.post('/orders', async(req, res) =>{
      const data = req.body
      const result = await orderCollections.insertOne(data)
      res.send(result)
    })

    // getting order info to frontend
    app.get('/orders', async(req, res) =>{
      const result = await orderCollections.find().toArray()
      res.send(result)
    })
    
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close(); (we have to remove this line otherwise it will close the database automatically)
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello devlopers')
})

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})