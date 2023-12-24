// app.js
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')
const userRoutes = require("./routes/userRoutes");
const questions = require("./data/data")
const path = require("path")

const app = express();

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use("/api/user", userRoutes);
app.get("/api/questions", (req, res)=>{
  res.json(questions);
});



// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------






app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
