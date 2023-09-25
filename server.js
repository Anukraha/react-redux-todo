const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));  

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee Manager." });
});

require("./app/routes/employees.routes")(app);

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});