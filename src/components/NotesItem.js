import React, { useContext,useEffect } from "react";
import NoteContext from "../contexts/NoteContext";


const NotesItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote,fetchNote} =context;
  const id =props.id;
  
  const delfxn =()=>{
    deleteNote(id);
    // props.showAlert("Note deleted successfully!", "success");
  }
  
  const open = (data)=>{
    props.setData(data);
    props.setShowH("block");
    props.setnotShowH("5px");
  }

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line
  }, [])

  return (
    <div className=" my-2 mx-2" >
      
      <div className="card" style={{width : "18rem",height:"15rem",maxWidth:"700px",backgroundColor:"rgba(255,255,255,0.5)",border:"1px solid black", borderRadius:"10px"}}>
        <div className="card-body" style={{display:"flex", flexDirection:"column"}}>
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
          <p className="card-text">
            {props.description.length >= 100 ? props.description.substring(0,100) + " ...":props.description}
          </p>
          
          <div style={{marginTop:"auto", marginBottom:"2px"}}>
            <button onClick={props.editnote} className=" btn btn-sm btn-primary ">
              Edit
            </button>
            <button onClick={()=>delfxn()}  className=" btn btn-sm btn-danger mx-2">
              Delete
            </button>
            <button onClick={()=>open(props.description)}  className=" btn btn-sm btn-success mx-2">
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
