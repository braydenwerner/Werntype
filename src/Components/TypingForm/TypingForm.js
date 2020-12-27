import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { db } from '../../firebase'
import {
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState,
  wpmState,
  signedInState,
  docDataState
} from '../../atoms/atoms'
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

  // words per minute the user types
  const [WPM, setWPM] = useRecoilState(wpmState)

  //  get and set data for user
  const [docData, setDocData] = useRecoilState(docDataState)

  //  starting time when first key is typed
  const [startTime, setStartTime] = useState(0)

  //  whether the user is signed in or not
  const signedIn = useRecoilValue(signedInState)

  //  do not allow copy paste into form
  useEffect(() => {
    if (formRef) formRef.current.onpaste = (e) => e.preventDefault()
  }, [])

  //  if the prompt is changed, reset the form
  useEffect(() => {
    if (formRef.current) formRef.current.value = ''
  }, [currentPrompt])

  //  0 -> currentCorrectIndex is green
  //  currentCorrectIndex + 1 -> currentIndex is red
  //  currentCurrentIndex + 1 -> currentPrompt.length is white
  const handleKeyDown = () => {
    //  if the last input was a number, remove it
    const formValue = formRef.current.value
    if (/\d/.test(parseInt(formValue))) {
      console.log('reached')
      formRef.current.value = formValue.substring(0, formValue.length - 1)
      return
    }

    if (currentIndex === 0) setStartTime(Date.now())

    const numWords = currentPrompt.split(' ').length
    const currentWord = currentPrompt.split(' ')[currentWordIndex]

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
      //  4.7 is the average length of word in English dictionary
      const tempWPM = Math.floor(
        currentCorrectIndex / 4.7 / ((Date.now() - startTime) / 60000)
      )
      setWPM(tempWPM)

      //  update user's stats
      //  if over 300 words, player is probably cheating
      if (signedIn && tempWPM <= 300) {
        const bestWPM = docData.bestWPM
        const email = docData.email
        const totalRaces = docData.totalRaces
        const username = docData.username
        const points = docData.points

        const newData = {
          email: email,
          avgWPM: Math.floor((points + tempWPM) / (totalRaces + 1)),
          bestWPM: tempWPM > bestWPM ? tempWPM : bestWPM,
          lastWPM: tempWPM,
          totalRaces: totalRaces + 1,
          points: points + tempWPM,
          username: username
        }

        //  set doc data so it gets rendered on profile
        setDocData(newData)
        db.collection('users')
          .doc(email)
          .set({
            ...newData
          })
          .catch((error) => {
            console.log(error.message)
          })
      }

      setCurrentPageState('summaryState')
    }

    setCurrentCorrectIndex(totalCorrectIndex)
    setCurrentIndex(totalIndex)
  }

  const handlePaste = () => {
    alert('Please do not paste into the text box.')
    formRef.current.value = ''
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
            <span style={{ color: 'WHITE', textDecoration: 'underline' }}>
              {currentPrompt.substring(currentIndex, currentIndex + 1)}
            </span>
            <span style={{ color: 'WHITE' }}>
              {currentPrompt.substring(currentIndex + 1, currentPrompt.length)}
            </span>
          </div>
          <input
            id="typing-form"
            type="text"
            placeholder="Type Here"
            maxLength={15}
            onChange={handleKeyDown}
            ref={formRef}
            autoComplete="off"
            autoCapitalize="none"
            onPaste={handlePaste}
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
