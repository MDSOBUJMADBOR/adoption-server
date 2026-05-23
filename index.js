const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

dotenv.config();

const uri = process.env.MONGODB_URI
const port =  8080;
// console.log("Mongo URI:", uri);


const app = express();
app.use(cors());
app.use(express.json());

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
    const db = client.db("PetAdoption");
    const coursesCollection = db.collection("courses");
    const requestCollection = db.collection("request");
  


app.get("/courses", async (req, res) => {
  const result = await coursesCollection.find().toArray();
  res.json(result);
})

  app.get("/courses/:id", async (req, res) => {
      const { id } = req.params;
      const result = await coursesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

app.get("/feature", async (req, res) => {
  const result = await coursesCollection.find().limit(6).toArray();
  res.json(result);
})

 app.post("/request", async (req, res) => {
      const requestData = req.body;
      // console.log(requestData);
      const result = await requestCollection.insertOne(requestData);
      res.json(result);
    }); 

app.get("/request", async (req, res) => {
  const result = await requestCollection.find().toArray();  
  res.json(result);
});

app.delete("/request/:id", async(req, res) => {
  const id = req.params.id;
  const query={
_id: new ObjectId(id)
  }
  const result = await requestCollection.deleteOne(query)
  res.send(result);
});

 app.post("/courses", async (req, res) => {
      const addData = req.body;
      // console.log(addData);
      const result = await coursesCollection.insertOne(addData);
      res.json(result);
    });


    






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});