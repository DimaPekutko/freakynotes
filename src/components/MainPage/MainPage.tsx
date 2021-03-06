import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import NoteItem from "../NoteItem/NoteItem"
import { Link, useNavigate } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';
import { Note } from '../../global/types';


function MainPage() {

  const noteCtx = useContext(NoteCtx)
  const navigate = useNavigate()

  const [searchName, setSearchName] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [tagToHighlight, setTagToHighlight] = useState<string>("")

  useEffect(() => {
    if (noteCtx?.notes) {
      setNotes(noteCtx.notes)
    }
  }, [noteCtx])

  const newNoteClick = () => {
    if (noteCtx) {
      let note = noteCtx?.create("")
      navigate("/item/" + note.id)
    }
  }

  const searchInputChange = (e: ChangeEvent) => {
    const element = (e.target as HTMLTextAreaElement);
    let name = element.value;
    let search_notes: Note[] = []
    if (!noteCtx) return
    if (name.length > 0) {
      for (let i = 0; i < noteCtx.notes.length; i++) {
        let note = noteCtx.notes[i]
        for (let j = 0; j < note.tags.length; j++) {
          let tag = note.tags[j]
          if (tag.name.indexOf(name) == 0) {
            search_notes.push(note)
            // console.log(tag)
            setTagToHighlight(tag.name)
            break;
          }
        }
      }
    }
    else {
      search_notes = noteCtx.notes
      setTagToHighlight("")
    }
    setNotes(search_notes)
    setSearchName(name)
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <form className="w-50 d-flex justify-content-center">
          <input
            type="text"
            className="pt-4"
            placeholder="Type tagname..."
            value={searchName}
            onChange={searchInputChange}
          />
        </form>
      </div>
      {
        notes.length > 0 ?
          notes.map((value, idx) => {
            return (
              <Link key={String(idx)} to={"/item/" + String(value.id)}>
                <NoteItem 
                  tagToHighlight={tagToHighlight} 
                  tags={value.tags} 
                  id={value.id} 
                  content={String(value.content)} 
                />
              </Link>
            )
          }) :
          <h3 className="text-center my-4">No notes yet.</h3>
      }
      <hr />
      <div className="row d-flex justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn mb-2" onClick={newNoteClick}>New Note</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
