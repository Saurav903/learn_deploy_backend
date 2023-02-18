const express = require("express");
const { NoteModel } = require("../models/Note.model");

const noteRouter = express.Router();

noteRouter.get("/",async(req,res)=>{
    const notes = await NoteModel.find();
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    const note = new NoteModel(payload);
    await note.save();
    res.send("note created")
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteID = req.params.id;
    const payload = req.body
    const note = await NoteModel.findOne({"_id":noteID});
    const userID_in_note = note.userID;  
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send("you are not authorized")
        }else {
            await NoteModel.findByIdAndUpdate({_id:noteID},payload);
            res.send("updated");
        }
        
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID = req.params.id;
    const note = await NoteModel.findOne({"_id":noteID});
    const userID_in_note = note.userID;  
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req!==userID_in_note){
            res.send("you are not authorized")
        }else {
            await NoteModel.findByIdAndDelete({_id:noteID});
            res.send("deleted");
        }
        
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

module.exports={
    noteRouter
}