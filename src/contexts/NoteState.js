import NoteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const initialnote = [];
  // eslint-disable-next-line
  const [notes, setnotes] = useState(initialnote);
  const url = "http://localhost:5000/api";

  //fetch notes
  const fetchNote = async () => {
    const response = await fetch(`${url}/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
          
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }

      // body data type must match "Content-Type" header
    });
    const json = await response.json();
    setnotes(json);
  };

  //adding notes
  const addNote = async(title, description,tag) => {
    const response = await fetch(`${url}/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
        body: JSON.stringify({title,description,tag})
      // body data type must match "Content-Type" header
    });
    const note  = await response.json();
    setnotes(notes.concat(note));
  };

  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${url}/notes/delnote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "auth-token":
        localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json = await response.json();
    const newnote = notes.filter((note)=>{return note._id!==id})
    setnotes(newnote);
  };

  //edit note
  const editNote = async(id,title,description,tag) => {
    const response = await fetch(`${url}/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
        body: JSON.stringify({title,description,tag})
      // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json = await response.json(); 
    
     let newNotes = JSON.parse(JSON.stringify(notes))
    
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setnotes(newNotes);
  
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, fetchNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
