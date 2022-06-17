import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';
import HashTagItem from "../../components/HashTagItem/HashTagItem";

import "../../styles/FormPage.scss";

function FormPage() {

  const noteCtx = useContext(NoteCtx)
  const navigate = useNavigate()
  // NotesContextInterface

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <button className="btn mx-3">Back</button>
          <button className="btn mx-3">Delete Note</button>
        </div>
      <hr />
      <div className="container w-75 pt-3 form_wrap">
        <div className="d-flex justify-content-center">
          <span className="mx-3">HashTags:</span> 
          <HashTagItem/>
          <HashTagItem/>
          <HashTagItem/>
        </div>
        <hr />
        <textarea defaultValue={"hello"} placeholder={"Type your text here"}>
        </textarea>
      </div>
      </div>
    </div>
  );
}

export default FormPage;
