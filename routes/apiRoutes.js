// linking our routes to a series of "data" sources.

var notes = require("../db/db");



module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
      });

      app.post("/api/notes", function(req, res) {
        console.log("The post new note is connected!")

        var newNote = req.body;
        
        console.log(newNote);

        notes.push(newNote);

        res.json(newNote);
      });
    

      app.delete("/api/notes/:id", function(req, res) {
        console.log("The delete note is connected!");
        

    });

}


