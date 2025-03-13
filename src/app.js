const express = require('express')

const app = express()


app.get("/user",(req,res)=>{
    res.send({name:"tetst"})
})

app.post("/user",(req,res)=>{
    res.send("User saved successfully.")
})

app.patch("/user",(req,res)=>{
    res.send("User updated successfully")
})

app.delete("/user",(req,res)=>{
    res.send("User deleted successfully")
})

app.use('/test',(req,res)=>{
    res.send('Test Page')
})

app.listen(3000,()=>{
console.log("Server is running on port 3000")
})