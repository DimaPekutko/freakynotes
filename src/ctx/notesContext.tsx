import { createContext, useState } from "react";

import { Note } from "../global/types"

export interface NotesContextInterface {
  notes: Note[]
  create(content: string): void
}

export const NoteCtx = createContext<NotesContextInterface | null>(null);

export const NoteProvider = ({ children }: any) => {

  const [notes, setNotes] = useState<Note[]>([
    {
      content: "hello"
    } as Note
  ])

  const create_note = (content: string) => {
    notes.push({
      content: content
    } as Note)
    setNotes(notes)
  }

  return (
    <NoteCtx.Provider value={
      {
        notes: notes,
        create: create_note
      } as NotesContextInterface
    }>{children}</NoteCtx.Provider>
  )
};