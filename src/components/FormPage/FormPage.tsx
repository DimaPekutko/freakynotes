import React, { useContext } from 'react';
import NoteItem from "../NoteItem/NoteItem"
import { useNavigate } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';


function FormPage() {

  const noteCtx = useContext(NoteCtx)
  const navigate = useNavigate()
  // NotesContextInterface

  return (
    <div className="container">
      <hr />
      <div className="row d-flex justify-content-center">
        <div className="col-12 d-flex justify-content-center mt-1">
          {/* <button className="btn" onClick={newNoteClick}>New Note</button> */}
        </div>
      </div>
    </div>
  );
}

export default FormPage;
