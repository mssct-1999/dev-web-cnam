const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

const db = require("../app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Cannot connect to database - Error: " + err)
        process.exit();
    });

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// simple route
app.get("/",(req,res) => {
    res.json({message: "Welcome on application"});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});