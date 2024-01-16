require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require('cors')
const http = require("http");
const mongoose=require('mongoose');
const app = express();
const server = http.createServer(app);

const {DatabaseLoader}=require('./loaders/DatabaseLoader');
const  {RoutesLoader} =require( "./loaders/RoutesLoader");

const bodyParser=require('body-parser');


// Define the port
const PORT = process.env.PORT||8080 ;

// Connect to MongoDB using the URI from .env

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
		app.use(bodyParser.json());
		app.use(cors());

DatabaseLoader.init(app);

RoutesLoader.initRoutes(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});