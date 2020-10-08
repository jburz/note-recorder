//packages required in
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db.json");

//express app setup
const app = express();
const PORT = 5000;

//middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./assets")));

//ajax request handling
app.post("/api/notes", (req, res) => {
    db.push(req.body);
    console.log(db);
    // fs.appendFile("db.json", myJSON, function(err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    // }); 
});

app.get("/api/notes", function(req, res) {
    fs.readFile("db.json", "utf8", function(err, data) {
        if (err) {
            return err;
        }
        const response = JSON.parse(data);
        res.send(response);
        
    })
});

//routing routines to serve pages from ajax requests
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});


//server listening on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));