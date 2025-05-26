const express = require("express");
const connectDB = require("./database/database");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
