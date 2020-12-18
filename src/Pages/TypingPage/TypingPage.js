import React from 'react'
import { Keyboard, TypingForm } from '../../Components/exports'
import './TypingPage.scss'

export default function TypingPage() {
  return (
    <div id="outer-component-container">
      <TypingForm />
      <Keyboard />
    </div>
  )
}
