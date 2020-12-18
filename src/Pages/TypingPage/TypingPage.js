import React from 'react'
import { Keyboard, TypingForm, Restart } from '../../Components/exports'
import './TypingPage.scss'

export default function TypingPage() {
  return (
    <div id="outer-component-container">
      <TypingForm />
      <Keyboard />
      <Restart />
    </div>
  )
}
