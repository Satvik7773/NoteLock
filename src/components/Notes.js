import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../contexts/NoteContext";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";
// import "./Notes.css";

const Notes = ({ title, description, props }) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);

  // eslint-disable-next-line
  const { notes, addNote, fetchNote, editNote } = context;
  const [showNotes, setShowNotes] = useState(notes);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNote();
    } else {
      props.showAlert("Please login to continue!", "warning");
      navigate("/login");
    }

    let tag = document.querySelector("#sort").value;
    if (tag === "All") {
      setShowNotes(notes);
    }
    else{
      let filteredNotes = notes.filter((note) => {
        if (note.tag === tag) return true;
        else return false;
      });
      setShowNotes(filteredNotes);
    }
    // eslint-disable-next-line
  }, [notes]);

  const [input, setinput] = useState({
    etitle: "",
    edescription: "",
    etag: "General",
  });

  const [id, setid] = useState("");
  const [flag, setflag] = useState(true);
  const [showH, setshowH] = useState("none");
  const [notShowH, setnotShowH] = useState("0px");
  const [data, setData] = useState("");

  const change = (e) => {
    const value = e.target.value;
    setinput({
      ...input,
      [e.target.name]: value,
    });
  };

  const save = () => {
    if (true) {
      addNote(input.etitle, input.edescription, input.etag);
      setinput({ etitle: "", edescription: "", etag: "General" });
    }
    props.showAlert("Note saved successfully", "success");
    // if(flag===false){
    //   editNote()
    // }
  };

  const update = async () => {
    await editNote(id, input.etitle, input.edescription, input.etag);
    setflag(true);
    setinput({ etitle: "", edescription: "", etag: "" });
    props.showAlert("Note updated Successfully!", "success");
  };

  function editnote(id) {
    setflag(false);
    setid(id);
    let note = {};
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        note = element;
        break;
      }
    }

    setinput({
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  }

  const handleFilter = () => {
    let tag = document.querySelector("#sort").value;
    if (tag === "All") {
      setShowNotes(notes);
      return;
    }
    
    let filteredNotes = notes.filter((note) => {
      if (note.tag === tag) return true;
      else return false;
    });
    setShowNotes(filteredNotes);
    
  };

  return (
    <>
      <button
        className="btn btn-danger"
        style={{
          position: "fixed",
          top: "16vh",
          left: "20vw",
          width: "fit",
          display: showH,
          zIndex: 5,
          padding: "5px",
        }}
        onClick={() => {
          setshowH("none");
          setnotShowH("0px");
        }}
      >
        Close
      </button>
      <div
        style={{
          position: "fixed",
          left: "20vw",
          top: "20vh",
          width: "70vw",
          height: "60vh",
          backgroundColor: "lightgrey",
          overflowY: "scroll",
          display: showH,
          zIndex: 5,
          padding: "5px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div style={{ padding: "5px" }}>{data}</div>
      </div>
      <div
        className="container"
        style={{ filter: `blur(${notShowH})`, zIndex: 4 }}
      >
        <div className="input my-3">
          <div className="my-4">
            <h2>Note title</h2>
            <input
              value={input.etitle}
              onChange={change}
              name="etitle"
              type="text"
              placeholder="Your title here"
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div className="my-3">
            <h2>Note description </h2>
            <textarea
              value={input.edescription}
              onChange={change}
              name="edescription"
              type="text"
              placeholder="Your description here"
              className="form-control"
              rows="5"
            />
          </div>
          <div onChange={change}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="General"
                name="etag"
                id="flexRadioDefault1"
                checked={input.etag === "General"}
                onChange={(e)=>{}}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                General
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Important"
                name="etag"
                id="flexRadioDefault2"
                checked={input.etag === "Important"}
                onChange={(e)=>{}}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Important
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Less Important"
                name="etag"
                id="flexRadioDefault2"
                checked={input.etag === "Less Important"}
                onChange={(e)=>{}}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Less Important
              </label>
            </div>
          </div>
          <div>
            {flag ? (
              <button className="btn btn-primary my-3" onClick={save}>
                Save
              </button>
            ) : (
              <button className="btn btn-success my-3" onClick={update}>
                {" "}
                Update
              </button>
            )}
          </div>
        </div>
        {/* dropdown  */}
        <select
          onChange={handleFilter}
          id="sort"
          className="form-select form-control"
          aria-label="Default select example"
          defaultValue={'All'}
        >
          <option value="All">
            All
          </option>
          <option value="General">General</option>
          <option value="Important">Important</option>
          <option value="Less Important">Less Important</option>
        </select>
        {/* </div> */}
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container mx-2">
            {notes.length === 0 && "Save your first note!!"}
          </div>

          {Array.isArray(notes)
            ? showNotes.map((note) => {
                return (
                  <div className="col col-lg-auto col-md-auto" key={note._id}>
                    <NotesItem
                      setShowH={setshowH}
                      setData={setData}
                      setnotShowH={setnotShowH}
                      title={note.title}
                      description={note.description}
                      tag={note.tag}
                      id={note._id}
                      editnote={() => {
                        editnote(note._id);
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Notes;