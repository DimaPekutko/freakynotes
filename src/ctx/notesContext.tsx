import { createContext, useEffect, useState } from "react";

import { HashTag, Note } from "../global/types"

export interface NotesContextInterface {
  notes: Note[]
  create(content: string): void
  get(idx: number): Note | undefined
  update(index: number, content: string, tags: HashTag[]): void
  delete(index: number): void
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

  const create_note = (content: string) => {
    notes.push({
      id: String(notes.length),
      content: content,
      tags: []
    } as Note)
    setNotes(clone_notes(notes))
  }
 
  const get_note = (idx: number): Note | undefined => {
    return notes[idx]
  }

  const update_note = (idx: number, content: string, tags: HashTag[]) => {
    notes[idx].content = content
    notes[idx].tags = tags
    setNotes(clone_notes(notes))
  }

  const delete_note = (idx: number) => {
    notes.splice(idx, 1)
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