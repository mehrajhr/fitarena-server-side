require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process
    .env.DB_USER}:${process.env.DB_PASS}@cluster0.a0ni9sf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const db = client.db('fitArenaDB');
    const eventsCollection = db.collection('events');
    const bookingsData = db.collection('bookings');

    // get events all
    app.get('/events/all', async(req , res) =>{
        const result = await eventsCollection.find().sort({eventDate : 1}).toArray();
        res.send(result);
    })
    app.get('/event/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await eventsCollection.findOne(query);
      res.send(result);
    })
    // create event
    app.post('/create-event', async(req , res) =>{
      const eventData = req.body;
      const result = await eventsCollection.insertOne(eventData);
      res.send(result);
    })

    // bookings
    app.get('/booking',async(req,res) =>{
      const {email} = req.query;
      const query = {user_email : email};
      const result = await bookingsData.find(query).toArray();
      res.send(result);
    })
    app.post('/booking', async(req , res) =>{
      const booking = req.body;
      const result = await bookingsData.insertOne(booking);
      res.send(result);
    })
    app.delete('/booking', async(req , res) =>{
      const {eventId , user_email} = req.query;
      const query = {eventId , user_email};
      const result = await bookingsData.deleteOne(query);
      res.send(result);
    })

    // check booking check
    app.get('/booking/check', async(req, res) =>{
      const {eventId , user_email} = req.query;
      const query = {eventId , user_email};
      const booking = await bookingsData.findOne(query);
      if(booking){
        res.send({booked : true});
      }
      else{
        res.send({booked : false});
      }
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

app.get('/', (req , res)=>{
    res.send('events server runing');
})
app.listen(port , () =>{
    console.log(`server running on port : ${port}`);
})