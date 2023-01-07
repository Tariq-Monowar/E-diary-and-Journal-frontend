import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import UserForm from './components/UserForm';
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/from' element={<UserForm />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App