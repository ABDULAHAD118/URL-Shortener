require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;

const staticRouter = require("./routes/staticRoute");
const router = require('./routes/url')

const connection = require("./db");

// Database
connection(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

// Middleware
app.set('view engine', 'ejs');
app.set('/views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', router);
app.use('/', staticRouter);

// Server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});