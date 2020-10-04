//packages required in
const express = require("express");
const path = require("path");

//express app setup
const app = express();
const PORT = process.env.PORT || 3000;

//middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));

//routing routines to serve pages from ajax requests
app.get("/css", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/js/index.js"));
})


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"))
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
});

//server listening on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));