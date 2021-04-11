const express=require('express');
const app=express();
const cors=require('cors')
const db=require('./Config/Mongoose')

const router=require('./Routes');

const PORT=8000;

app.use(cors())
app.use(express.json())

app.use("/",router)

app.listen(PORT,()=>console.log("Server running on port "+PORT))