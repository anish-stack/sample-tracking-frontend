
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react'
function App() {


  return (
    <>
    <BrowserRouter>
      <Home />
   <ToastContainer/>
    </BrowserRouter>
    </>
  )
}

export default App
