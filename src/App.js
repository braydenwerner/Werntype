import React from 'react'
import {
  TypingForm,
  Keyboard,
  Restart,
  Nav,
  Profile,
  Leaderboard
} from './Components/exports'
import './App.scss'

//  includes main page components and absolute position components
function App() {
  return (
    <div id="component-container">
      <Nav />
      <TypingForm />
      <Keyboard />
      <Leaderboard />
      <Profile />
      <Restart />
    </div>
  )
}

export default App
