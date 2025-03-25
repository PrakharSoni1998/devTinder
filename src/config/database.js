const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Prakhar:vj74Yrs47AH8d6kB@namastenode.qfuvf.mongodb.net/devTinder"
  );
};

module.exports = connectDB