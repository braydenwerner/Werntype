import React from 'react'
import {
  TypingForm,
  Keyboard,
  Restart,
  Nav,
  Profile
} from './Components/exports'
import './App.scss'

//  includes main page components and absolute position components
function App() {
  return (
    <>
      <Nav />
      <div id="component-container">
        <TypingForm />
        <Keyboard />
        <Profile />
        <Restart />
      </div>
    </>
  )
}

export default App
