require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.use("/pdf", require("./controllers/PDFController"));

app.listen(port);
console.log("Succefully connected in " + port);





