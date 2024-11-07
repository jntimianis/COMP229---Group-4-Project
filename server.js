import config from "./config/config.js";
import app from "./server-copy/express.js";
import mongoose from "mongoose";
import database from "./server-copy/models/user.model.js"

app.set("view engine", "ejs")

mongoose.Promise = global.Promise;



const findData = async (req, res) => {
  const data =  await database.find()
  res.send({data})

}



 
const createData = async (req, res) => {
  const data =  await database.create({
    concertName : req.body.concertName,
    concertPicture : req.body.concertPicture,
    concertPost : req.body.concertPost,
    customerName : req.body.customerName,
    userName : req.body.userName,
    password: req.body.password,
    customerEmail: req.body.customerEmail
    
    //hashed_password: "dsdsd",
   // salt: "dd"
  })
  console.log(data)
 res.redirect("/")
}

const deletePost = async(req,res) => {
  const deletedData  = await database.deleteOne({_id: "672b7be0de5a6d030800b639"})
  console.log(deletedData)
  res.redirect("/")
}


const updateData = async(req,res) => { 
  const {id} = req.params
   const updateData =  await database.findByIdAndUpdate({_id:id}, req.body)
   res.send(updateData)
}
//route
app.get("/login", async(req,res) => { 
res.render("miniAppLogin")
})

app.post("/login", async(req,res) => { 

  res.redirect("login")
  
  })

app.get("/",  findData);
app.get("/create", createData);
app.get("/delete", deletePost);
app.post("/update/:id", updateData);

mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true

  })
  .then(() => {
    console.log("Connected to the database!");
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});



app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
