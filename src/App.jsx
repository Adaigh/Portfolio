import { useState } from 'react'
import Home from './components/pages/Home'
import NavBar from './components/ui/NavBar'
import Background from './components/ui/Background'

function App() {

  return (
    <>
      <Background />
      <NavBar />
      <Home />
    </>
  )
}

export default App
