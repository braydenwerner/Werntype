import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './AnimatedHeader.scss'

export default function AnimatedHeader({ text }) {
  //    this is overall pretty bad, did this a while ago, but its functional
  const [currentString, updateCurrentString] = useState('')
  const [currentStringIndex, updateStringIndex] = useState(0)

  //  temp letter is necessary to the page doesnt jump when currentString is first init
  //  set temp letter to nothing once currentString has something rendered
  const [tempLetter, setTempLetter] = useState('_')

  // if there are other dependencies causing re-render, this will not work
  let count = 0
  let delayCount = 0
  let delay = false
  let increasing = true

  const delayCooldown = 90

  useEffect(() => {
    const animateStringTextInterval = setInterval(animateStringText, 50)

    return () => clearInterval(animateStringTextInterval)
  }, [])

  const animateStringText = () => {
    setTempLetter('')
    if (delay) delayCount++

    if (delayCount > delayCooldown) {
      delayCount = 0
      delay = false
    }

    if (!delay) {
      if (increasing) count++
      else count--

      if (count === 0 && !increasing) {
        increasing = true
        delay = true
        delayCount = 60
      } else if (count === text.length && increasing) {
        increasing = false
        delay = true
        delayCount = 0
      }

      updateStringIndex(currentStringIndex)
      updateCurrentString(text.substring(0, count))
    }
  }

  return (
    <div id="animated-header-container">
      <div id="animated-header">
        {tempLetter}
        {currentString}
      </div>
      <span id="animated-header-cursor">_</span>
    </div>
  )
}

AnimatedHeader.propTypes = {
  text: PropTypes.string
}
