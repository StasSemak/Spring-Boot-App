import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/tailwind/navbars';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import Template from './components/templates/template';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route index element={ <Home/> }/>
        <Route path='team' element={ <Template name="Team"/> }/>
        <Route path='projects' element={ <Template name="Projects"/> }/>
        <Route path='calendar' element={ <Template name="Calendar"/> }/>
        <Route path='*' element={ <Home/> }/>
      </Routes>
    </div>
  );
}

export default App;
