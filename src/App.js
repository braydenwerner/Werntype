import React from 'react'
import { TypingForm, Keyboard, Restart } from './Components/exports'
import './App.scss'

function App() {
  return (
    <div id="outer-component-container">
      <TypingForm />
      <Keyboard />
      <Restart />
    </div>
  )
}

export default App
