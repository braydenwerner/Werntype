import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { pageState } from '../../atoms/atoms'

import './Keyboard.scss'

export default function Keyboard() {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    [' ']
  ]

  //  create a Set. keys are added after key press and are set to be highlighted
  const [keysToHighlight, setKeysToHighlight] = useState(new Set())

  //  get global page state and render component accordingly
  const currentPageState = useRecoilValue(pageState)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleKeyDown = (e) => {
    setKeysToHighlight((oldKeysToHighlight) => {
      const newKeysToHighlight = new Set(oldKeysToHighlight)
      newKeysToHighlight.add(e.key)

      return newKeysToHighlight
    })

    setTimeout(function () {
      setKeysToHighlight((oldKeysToHighlight) => {
        const newKeysToHighlight = new Set(oldKeysToHighlight)
        newKeysToHighlight.delete(e.key)

        return newKeysToHighlight
      })
    }, 100)
  }

  return (
    <>
      {currentPageState === 'typingState' && (
        <div id="keyboard-outer-container">
          {rows.map((row) => {
            return (
              <div className="key-row" key={row}>
                {row.map((key) => {
                  return (
                    <div
                      className={`key-highlight-${keysToHighlight.has(key)}`}
                      key={key}
                      id={key === ' ' ? 'Space' : key}
                    >
                      <span className="key">{key}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
