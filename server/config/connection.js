const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks"
);
// mongoose.connect(
//   "mongodb+srv://9certified:3c0GVnzwxOZ2AiND@cluster0.urkpnwy.mongodb.net/bookdb?retryWrites=true&w=majority&appName=Cluster0"
// );
module.exports = mongoose.connection;
