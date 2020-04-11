// linking our routes to a series of "data" sources.

var notes = require("../db/db");
var fs = require("fs");





module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
        if (!notes === undefined || !notes.length == 0) {
          
          for (let i = 0; i < notes.length; i++) {
            notes[i].id = i;
          }
        }
        
      });

      app.post("/api/notes", function(req, res) {
        console.log("The post new note is connected!")

        var newNote = req.body;
        // if db is empty writes first note
        if(notes==="") {

          newNote.id = 0;

          let notesString = JSON.stringify(newNote);
          fs.writeFile("db/db.json", notesString, function(err){
            if(err) throw err;
  
            console.log("New note Stored Successfully");
            });
          }
        else {
              

              // adding an id to the new note
              newNote.id = notes.length;

              notes.push(newNote);

              console.log(notes);

              res.json(newNote);

              let notesString = JSON.stringify(notes);

              fs.writeFile("db/db.json", notesString, function(err){
                if(err) throw err;

                console.log("New note Stored Successfully");
                
              });
            }
          });
        

      app.delete("/api/notes/:id", function(req, res) {
        
        var chosen = req.params.id;
        
        notes.splice(chosen, 1);

        let notesString = JSON.stringify(notes);

        fs.writeFile("db/db.json", notesString, function(err){
          if(err) throw err;

          console.log("DELETED Successfully");
          
        });

        // rearrange all the id so to match the index of the array
        if (!notes === undefined || !notes.length == 0) {
          
            for (let i = 0; i < notes.length; i++) {
              notes[i].id = i;
            }
          }
          
         res.json(true); 
        
    });

}


