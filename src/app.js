const express = require('express')

const app = express()


app.get('/users/:userId/:name',(req,res)=>{
    console.log(req.params);
    
    res.send({name:"tetst"})
})


app.listen(3000,()=>{
console.log("Server is running on port 3000")
})