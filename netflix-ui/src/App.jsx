import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import { Routes, Route } from 'react-router-dom'
import Player from './pages/Player'

const App = () => {
  return (
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/player' element={<Player/>} />
            <Route path="/" element={<Netflix/>} />
        </Routes>
  )
}

export default App