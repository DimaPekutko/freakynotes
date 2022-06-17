import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from "../MainPage/MainPage";
import {NoteCtx, NoteProvider}  from"../../ctx/notesContext"
import './../../styles/App.scss';



function App() {

  return (
    <div className="App">
      <h1 className='text-center pt-3'>Freaky Notes</h1>
      <NoteProvider>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </NoteProvider>
    </div>
  );
}

export default App;
