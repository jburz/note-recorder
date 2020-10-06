//packages required in
const express = require("express");
const path = require("path");
const fs = require("fs");

//express app setup
const app = express();
const PORT = 5000;

//middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./assets")));

//routing routines to serve pages from ajax requests
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
    console.log('notes');
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
    console.log('home');
});

//ajax request handling
let data = [];
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    data.push(req.body);
    const myJSON = JSON.stringify(data);
    console.log(myJSON);
    fs.writeFile("db.json", myJSON, function(err) {
        if (err) {
            return console.log(err);
        }
    }); 
});

//server listening on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));