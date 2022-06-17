import React, { useContext } from 'react';
import NoteItem from "../NoteItem/NoteItem"
import { Link, useNavigate } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';


function MainPage() {

  const noteCtx = useContext(NoteCtx)
  const navigate = useNavigate()
  // NotesContextInterface

  const newNoteClick = () => {
    const id = noteCtx?.notes.length
    noteCtx?.create("Empty note")
    navigate("/item/"+String(id))
  }

  return (
    <div className="container">
      {
        noteCtx?.notes.map((value, idx) => {
          return (
            <Link key={String(idx)} to={"/item/"+String(idx)}>
              <NoteItem tags={value.tags} id={String(idx)} content={String(value.content)}/>
            </Link>
          )
        })
      }
      <hr />
      <div className="row d-flex justify-content-center">
        <div className="col-12 d-flex justify-content-center mt-1">
          <button className="btn" onClick={newNoteClick}>New Note</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
