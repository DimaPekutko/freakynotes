import { createContext, useEffect, useState } from "react";

import { HashTag, Note } from "../global/types"

export interface NotesContextInterface {
  notes: Note[]
  create (content: string): Note
  get    (id: string): Note | undefined
  update (index: string, content: string, tags: HashTag[]): void
  delete (index: string): void
}

export const NoteCtx = createContext<NotesContextInterface | null>(null);

export const NoteProvider = ({ children }: any) => {

  const [notes, setNotes] = useState<Note[]>([])
  const [setupNotesCount, setSetupNotesCount] = useState<number>(0)

  useEffect(()=>{
    setSetupNotesCount(setupNotesCount+1)
    if (setupNotesCount) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
    else {
      const json_notes = localStorage.getItem("notes")
      if (json_notes !== null) {
        setNotes(JSON.parse(json_notes))
      }
    }
  }, [notes])

  const clone_notes = (notes: Note[]): Note[] => {
    const new_notes: Note[] = []
    for (let i = 0; i < notes.length; i++) {
      new_notes.push({...notes[i]})
    }
    return new_notes
  }

  const create_note = (content: string): Note => {
    let new_note = {
      id: 'id' + (new Date()).getTime(),
      content: content,
      tags: []
    } as Note 
    notes.push(new_note)
    setNotes(clone_notes(notes))
    return new_note
  }
 
  const get_note = (id: string): Note | undefined => {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) return notes[i] 
    }
    return undefined
  }

  const update_note = (id: string, content: string, tags: HashTag[]) => {
    let note = get_note(id)
    if (note) {
      note.content = content
      note.tags = tags
      setNotes(clone_notes(notes))
    }
  }

  const delete_note = (id: string) => {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        notes.splice(i, 1)
        break
      }  
    }
    setNotes(clone_notes(notes))
  }

  return (
    <NoteCtx.Provider value={
      {
        notes: notes,
        create: create_note,
        get: get_note,
        update: update_note,
        delete: delete_note
      } as NotesContextInterface
    }>{children}</NoteCtx.Provider>
  )
};