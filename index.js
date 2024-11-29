import express from "express";
const app = express()
import cors from "cors"

app.listen(8080,()=>{
    console.log("Server started at port 8080")
});

const usr = encodeURIComponent("username")
const pwd = encodeURIComponent("password")

import{ MongoClient,ObjectId} from "mongodb";
const uri = "mongodb+srv://${usr}:${pwd}<db_password>@cluster0.losii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = client.db("ecomm")

app.use(express.json())
app.use(cors())

app.get("/",async (req,res)=>{
    const items = await db.collection("products").find().toArray()
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price } = req.body;
    const data = {
      name: name,
      price: price,
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });