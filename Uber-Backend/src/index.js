require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const establishDatabaseConnection = require("./config/connection");


const cookieParser = require("cookie-parser");

const UserAuth = require("./Middleware/UserAuth");

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://another-example.com'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/auth',require('./Routes/auth.route'));
app.use('/',require('./Routes/common.route'));

const PORT = process.env.PORT || 3000;

establishDatabaseConnection()
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server is now running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
