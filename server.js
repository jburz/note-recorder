//packages required in
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = "./db.json";

//express app setup
const app = express();
const PORT = process.env.PORT || 5000;

//middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./assets")));

//function to refresh db.json
function getDB() {
    return JSON.parse(fs.readFileSync(db, "utf8"));
}

//ajax request handling
//post request
app.post("/api/notes", (req, res) => {
    const currentNotes = getDB();
    console.log(currentNotes);
    let newNote = req.body;
    newNote.id = Date.now();
    console.log(newNote);
    currentNotes.push(newNote);
    const notesToJSON = JSON.stringify(currentNotes);
    console.log(notesToJSON);

    fs.writeFileSync(db, notesToJSON, function(err) {
        if (err) {
            return console.log(err);
        }
    });

    res.send(currentNotes);

});

//get request
app.get("/api/notes", function (req, res) {
    res.send(getDB());
});

//delete request
app.delete("/api/notes/:id", function (req, res) {
    console.log(getDB().filter(function(note) {
        return note.id != req.params.id;
    }));
    const newDB = getDB().filter(function(note) {
        return note.id != req.params.id;
    });

    notesToJSON = JSON.stringify(newDB);
    fs.writeFileSync(db, notesToJSON, function(err) {
        if (err) {
            return console.log(err);
        }
    });

    res.send(newDB);

    
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