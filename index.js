const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 3000;

const app = express()
app.use(cors());

app.use(express.json())


//Mongodb code 


const uri = "mongodb+srv://Pawmart-A10:imtepawmartA10@pawmarta10.t0jzost.mongodb.net/PawMartA10?retryWrites=true&w=majority&appName=PawMartA10";

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
    
    await client.connect();

    app.post('/service', async(req, res) => {

      const data = req.body;
      console.log(data)
    })
    
    await client.db("admin").command({ ping: 1 });
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