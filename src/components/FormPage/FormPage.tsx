import React, { ChangeEvent, createRef, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NoteCtx, NotesContextInterface } from '../../ctx/notesContext';
import HashTagItem from "../../components/HashTagItem/HashTagItem";

import "../../styles/FormPage.scss";
import { HashTag, Note } from '../../global/types';

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

function FormPage() {

  const noteId = String(useParams().id as string);
  const noteCtx = useContext(NoteCtx);
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(()=> {
    if (!noteCtx || note) return
    const new_note = noteCtx.get(noteId)
    if (new_note) {
      setNote(new_note)
    }
  })

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

  const extractTextFromHtml = (html: string): string => {
    let element = document.createElement("div")
    let text = "" 
    element.innerHTML = html
    text = element.textContent || element.innerText
    element.remove()
    return text
  }

  const contentChange = (e: ContentEditableEvent) => {
    let content = e.target.value
    content = extractTextFromHtml(content)
    if (note && noteCtx) {
      const new_note = {...note}
      new_note.content = content
      new_note.tags = getContentTags(content)
      setNote(new_note)
      if (content.length) {
        noteCtx?.update(noteId, content, new_note.tags)
      }
    }
  }

  const highligtedContent = (content: string): string => {
      let new_content = extractTextFromHtml(content)
      if (note) {
        const tag_names: string[] = [] 
        note.tags.map(tag => tag_names.push(tag.name))
        if (tag_names.length > 0) {
          const reg = new RegExp(tag_names.join("|"), "g");
          new_content = new_content.replace(reg, (matched) => 
            `<span class="highlighted_tag">${matched}</span>`);
        }
        return new_content
      }
      return content
  }

  const deleteClick = () => {
    if (note && noteCtx) {
      if (window.confirm("Are you sure you want to delete this note?")) {
        noteCtx?.delete(noteId)
        navigate("/")
      }
    }
  }

  const a = () => {
    return <mark>{"hello"}</mark>;
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
        <ContentEditable
          html={
            note ?
            highligtedContent(note.content) :
            ""
          }// innerHTML of the editable div
          disabled={false}       // use true to disable editing
          onChange={contentChange} // handle innerHTML change
          tagName='div' // Use a custom HTML tag (uses a div by default)
          className="content_textarea"
        />
      </div>
      </div>
    </div>
  );
}

export default FormPage;
