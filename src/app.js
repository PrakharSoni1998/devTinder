const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.post("/user",(req, res) => {
    res.send("User logged in");
  });

app.get("/user",userAuth, (req, res) => {
    res.send("User data");
  });

app.get("/admin/getAllData", (req, res) => {
  res.send("All data fetched");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
