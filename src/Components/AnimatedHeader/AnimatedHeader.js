import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './AnimatedHeader.scss'

export default function AnimatedHeader({ text }) {
  //    this is overall pretty bad, did this a while ago, but its functional
  const [currentString, updateCurrentString] = useState('')
  const [currentStringIndex, updateStringIndex] = useState(0)

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
      updateCurrentString(text.substring(0, count) + '_')
    }
  }

  return <div id="animated-header">{currentString}</div>
}

AnimatedHeader.propTypes = {
  text: PropTypes.string
}
