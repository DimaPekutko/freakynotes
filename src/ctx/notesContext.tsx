import { createContext, useState } from "react";

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

  const create_note = (content: string) => {
    notes.push({
      id: String(notes.length),
      content: content,
      tags: []
    } as Note)
    setNotes(notes)
  }

  const get_note = (idx: number): Note | undefined => {
    return notes[idx]
  }

  const update_note = (idx: number, content: string, tags: HashTag[]) => {
    notes[idx].content = content
    notes[idx].tags = tags
    setNotes(notes)
  }

  const delete_note = (idx: number) => {
    notes.splice(idx, 1)
    setNotes(notes)
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