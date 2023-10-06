const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//  ROUTE 1: Fetching all notes of a user using GET /api/auth/getuser. Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log("Error in fethcallnotes\n" + error);
    res.status(500).json({ error: "Internal server Error!" });
  }
});

//  ROUTE 2: Creating notes of a user using POST /api/notes/addnote. Login Required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Title is mandatory").exists(),
    body("description", "Description is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log("Error in addnotes\n" + error);
      res.status(500).json({ error: "Internal server Error!" });
    }
  }
);

//  ROUTE 3: Update an existing note of a user using PUT /api/notes/updatenote. Login Required
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      // creating a new note object
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // finding the note to be updated and then, updating it
      let note = await Notes.findById(req.params.id);
      
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, {new:true});
      res.json(note);
    } catch (error) {
      console.log("Error in update note\n" + error);
      res.status(500).json({ error: "Internal server Error!" });
    }
  }
);


//  ROUTE 4: Delete an existing note of a user using DELETE /api/notes/deletenote. Login Required
router.delete(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      // finding the note to be deleted and then, deleting it
      let note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow deletion if user is authenticated
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.status(200).json({'success': 'Note deleted'});
    } catch (error) {
      console.log("Error in update note\n" + error);
      res.status(500).json({ error: "Internal server Error!" });
    }
  }
);

module.exports = router;
