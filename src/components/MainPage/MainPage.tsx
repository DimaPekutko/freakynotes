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

  useEffect(() => {
    if (noteCtx?.notes) {
      setNotes(noteCtx.notes)
    }
  }, [noteCtx])

  const newNoteClick = () => {
    const id = noteCtx?.notes.length
    noteCtx?.create("")
    navigate("/item/" + String(id))
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
            console.log("finded")
            search_notes.push(note)
            break;
          }
        }
      }
    }
    else {
      search_notes = noteCtx.notes
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
        notes.map((value, idx) => {
          return (
            <Link key={String(idx)} to={"/item/" + String(idx)}>
              <NoteItem toHighlightWords={
                  searchName.length > 0
                } 
                tags={value.tags} 
                id={String(idx)} 
                content={String(value.content)} 
              />
            </Link>
          )
        })
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
