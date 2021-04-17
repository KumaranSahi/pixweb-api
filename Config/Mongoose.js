const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://Kumaran:p2ByFG4p4yY4XChv@pix-ecosystem.kzgz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

db.on('error', console.error.bind("Something went wrong with the Mongodb Server"));

db.once("open",()=>console.log("Connection extablished with database"))

module.exports=db;