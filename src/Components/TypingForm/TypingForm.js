import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  formState,
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState
} from '../../recoil'
import './TypingForm.scss'

export default function TypingForm() {
  const formRef = useRef(null)

  //  the prompt the user types
  const currentPrompt = useRecoilValue(promptState)

  //  corresponds to the index of each word in currentPrompt.split(" ")
  const [currentWordIndex, setCurrentWordIndex] = useRecoilState(wordIndexState)

  //  the index in currentPrompt where current word starts
  const [currentWordStartIndex, setCurrentWordStartIndex] = useRecoilState(
    wordStartIndexState
  )

  //  the index up to the first incorrect key
  const [currentCorrectIndex, setCurrentCorrectIndex] = useRecoilState(
    correctIndexState
  )

  //  the current index the user is on, including incorrect keys
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState)

  //  toggles state and renders components accordingly
  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  //  starting time when first key is typed
  const [startTime, setStartTime] = useState(0)

  // words per minute the user types
  const [WPM, setWPM] = useState(0)

  useEffect(() => {
    formRef.current.value = ''
  }, [currentPrompt])

  //  0 -> currentCorrectIndex is green
  //  currentCorrectIndex + 1 -> currentIndex is red
  //  currentCurrentIndex + 1 -> currentPrompt.length is white
  const handleKeyDown = () => {
    if (formRef.current.value === 'p') setCurrentPageState('summaryState')
    console.log('reached')

    if (currentIndex === 0) setStartTime(Date.now())

    const numWords = currentPrompt.split(' ').length
    const currentWord = currentPrompt.split(' ')[currentWordIndex]
    const formValue = formRef.current.value

    let correctChars = 0
    while (
      formValue[correctChars] &&
      formValue[correctChars] === currentWord[correctChars]
    ) {
      correctChars++
    }

    const totalCorrectIndex = currentWordStartIndex + correctChars
    const totalIndex = currentWordStartIndex + formValue.length

    if (
      formValue[formValue.length - 1] === ' ' &&
      formValue.substring(0, formValue.length - 1) === currentWord
    ) {
      setCurrentWordIndex((oldCurrentWord) => {
        return oldCurrentWord + 1
      })

      setCurrentWordStartIndex((oldCurrentWordStartIndex) => {
        return oldCurrentWordStartIndex + formValue.length
      })

      formRef.current.value = ''
    }

    if (currentWordIndex === numWords - 1 && formValue === currentWord) {
      setCurrentPageState('summaryState')
      setWPM(numWords / ((Date.now() - startTime) / 60000))
    }

    setCurrentCorrectIndex(totalCorrectIndex)
    setCurrentIndex(totalIndex)
  }

  return (
    <>
      {currentPageState === 'typingState' && (
        <div id="typingForm-outer-container">
          <div id="text-prompt">
            <span style={{ color: '9EE493' }}>
              {currentPrompt.substring(0, currentCorrectIndex)}
            </span>
            <span style={{ color: 'RED' }}>
              {currentPrompt.substring(currentCorrectIndex, currentIndex)}
            </span>
            <span style={{ color: 'WHITE' }}>
              {currentPrompt.substring(currentIndex, currentPrompt.length)}
            </span>
          </div>

          <input
            id="typing-form"
            type="text"
            placeholder="Type Here"
            maxLength={15}
            onChange={handleKeyDown}
            ref={formRef}
            autoFocus
          ></input>
        </div>
      )}

      {currentPageState === 'summaryState' && (
        <div id="summaryForm-outer-container">
          <div id="summary-wpm">WPM: {WPM}</div>
        </div>
      )}
    </>
  )
}