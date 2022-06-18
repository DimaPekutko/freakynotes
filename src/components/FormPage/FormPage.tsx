import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';
import HashTagItem from "../../components/HashTagItem/HashTagItem";

import "../../styles/FormPage.scss";
import { HashTag, Note } from '../../global/types';

function FormPage() {

  const noteIdx = parseInt(useParams().id as string);
  const noteCtx = useContext(NoteCtx);
  const [note, setNote] = useState<Note | null>(null);

  const navigate = useNavigate();

  useEffect(()=> {
    if (!noteCtx) return
    const new_note = noteCtx.get(noteIdx)
    if (new_note) {
      setNote(new_note)
    }
  }, [noteIdx])

  const backPageClick = () => {
    navigate("/");
  }

  const getContentTags = (content: string): HashTag[] => {
    const regex = new RegExp('(\\#[a-zA-Z]+\\b)(?!;)', 'gm')
    const names_set = new Set<string>()
    let m, name;
    while ((m = regex.exec(content)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
          match = match.trim()
          name = String(match).substring(1, match.length)
          names_set.add(name)
        });
    }
    const names_arr = Array.from(names_set)
    const tags: HashTag[] = []
    names_arr.forEach(value => tags.push({name:value}))
    return tags
  }

  const contentChange = (e: ChangeEvent) => {
    const element = (e.target as HTMLTextAreaElement);
    let content = element.value;
    if (note && noteCtx) {
      const new_note = {...note}
      new_note.content = content
      new_note.tags = getContentTags(content)
      setNote(new_note)
      if (content.length) {
        noteCtx?.update(noteIdx, content, new_note.tags)
      }
    }
  }

  const deleteClick = () => {
    if (note && noteCtx) {
      if (window.confirm("Are you sure you want to delete this note?")) {
        noteCtx?.delete(noteIdx)
        navigate("/")
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <button className="btn mx-3" onClick={backPageClick}>Back</button>
          <button className="btn mx-3" onClick={deleteClick}>Delete Note</button>
        </div>
      <hr />
      <div className="container pt-3 form_wrap">
        <div className="d-flex flex-wrap justify-content-center">
          <span className="mx-3">HashTags:</span> 
          {
            note ? note.tags.map((value, idx)=>{
              return (
                <HashTagItem key={idx} name={value.name}/>
              )
            }) : "No tags"
          }
        </div>
        <hr />
        <textarea value={
            note ? note.content : ""
        } placeholder={"Type your text here"} onChange={contentChange}>
        </textarea>
      </div>
      </div>
    </div>
  );
}

export default FormPage;
