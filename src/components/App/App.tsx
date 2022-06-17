import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {NoteCtx, NoteProvider}  from"../../ctx/notesContext"
import MainPage from "../MainPage/MainPage";
import FormPage from "../FormPage/FormPage"
import './../../styles/App.scss';



function App() {

  return (
    <div className="App">
      <h1 className='text-center pt-3'>Freaky Notes</h1>
      <NoteProvider>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/item/:id' element={<FormPage />} />
        </Routes>
      </NoteProvider>
    </div>
  );
}

export default App;
