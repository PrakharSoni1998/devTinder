const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/user", (req, res) => {
    try {
        throw new Error("wqsafer");
    
        res.send("User data");        
    } catch (error) {
        res.status(500).send("By catch block")
    }

  });

  app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("SOmething went wrong");
    }
  })


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
