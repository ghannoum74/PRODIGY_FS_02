const express = require("express");
const server = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const user = require("./routes/user");
const tasks = require("./routes/tasks");
const administrator = require("./routes/administrator");

server.use(cors());
server.use(express.json());

server.use("/auth/user", user);
server.use("/user/tasks", tasks);
server.use("/admin", administrator);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT}\nConnected to dataBase...`
      );
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });
