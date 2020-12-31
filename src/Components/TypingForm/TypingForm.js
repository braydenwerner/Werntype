import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
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
  docDataState,
  segmentedWPMState
} from '../../atoms/atoms'
import './TypingForm.scss'

export default function TypingForm() {
  const formRef = useRef(null)

  //  the prompt the user types
  const prompt = useRecoilValue(promptState)

  //  corresponds to the index of each word in prompt.split(" ")
  const [wordIndex, setWordIndex] = useRecoilState(wordIndexState)

  //  the index in prompt where current word starts
  const [wordStartIndex, setWordStartIndex] = useRecoilState(
    wordStartIndexState
  )

  //  the index up to the first incorrect key
  const [correctIndex, setCorrectIndex] = useRecoilState(correctIndexState)

  //  the current index the user is on, including incorrect keys
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState)

  //  toggles state and renders components accordingly
  const [page, setPage] = useRecoilState(pageState)

  //  get and set data for user
  const [docData, setDocData] = useRecoilState(docDataState)

  //  array of current WPM after each word
  const setSegmentedWPM = useSetRecoilState(segmentedWPMState)

  // words per minute the user types
  const setWPM = useSetRecoilState(wpmState)

  //  whether the user is signed in or not
  const signedIn = useRecoilValue(signedInState)

  //  starting time when first key is typed
  const [startTime, setStartTime] = useState(0)

  //  do not allow copy paste into form
  useEffect(() => {
    if (formRef) formRef.current.onpaste = (e) => e.preventDefault()
  }, [])

  //  if the prompt is changed, reset the form
  useEffect(() => {
    if (formRef.current) formRef.current.value = ''
  }, [prompt])

  //  0 -> correctIndex is green
  //  correctIndex + 1 -> currentIndex is red
  //  currentCurrentIndex + 1 -> prompt.length is white
  const handleKeyDown = () => {
    //  if the last input was a number, remove it
    const formValue = formRef.current.value
    if (formValue === '`') {
      formRef.current.value = formValue.substring(0, formValue.length - 1)
      return
    }

    if (currentIndex === 0) setStartTime(Date.now())

    const numWords = prompt.split(' ').length
    const currentWord = prompt.split(' ')[wordIndex]

    let correctChars = 0
    while (
      formValue[correctChars] &&
      formValue[correctChars] === currentWord[correctChars]
    ) {
      correctChars++
    }

    const totalCorrectIndex = wordStartIndex + correctChars
    const totalIndex = wordStartIndex + formValue.length

    //  space bar pressed, new word
    if (
      formValue[formValue.length - 1] === ' ' &&
      formValue.substring(0, formValue.length - 1) === currentWord
    ) {
      setWordIndex((oldCurrentWord) => {
        return oldCurrentWord + 1
      })

      setWordStartIndex((oldCurrentWordStartIndex) => {
        return oldCurrentWordStartIndex + formValue.length
      })

      //  if no mistypes
      if (totalCorrectIndex === totalIndex - 1) {
        console.log('adding')
        setSegmentedWPM((oldSegmentedWPM) => {
          return [
            ...oldSegmentedWPM,
            Math.floor(
              totalCorrectIndex / 4.7 / ((Date.now() - startTime) / 60000)
            )
          ]
        })
      }

      //  add the current speed of the user to array
      formRef.current.value = ''
    }

    if (wordIndex === numWords - 1 && formValue === currentWord) {
      //  4.7 is the average length of word in English dictionary
      const tempWPM = Math.floor(
        totalCorrectIndex / 4.7 / ((Date.now() - startTime) / 60000)
      )
      setWPM(tempWPM)
      setSegmentedWPM((oldSegmentedWPM) => {
        return [...oldSegmentedWPM, tempWPM]
      })

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

      setPage('summaryState')
    }

    setCorrectIndex(totalCorrectIndex)
    setCurrentIndex(totalIndex)
  }

  const handlePaste = () => {
    alert('Please do not paste into the text box.')
    formRef.current.value = ''
  }

  return (
    <>
      {page === 'typingState' && (
        <div id="typingForm-outer-container">
          <div id="text-prompt">
            <span style={{ color: '9EE493' }}>
              {prompt.substring(0, correctIndex)}
            </span>
            <span style={{ color: 'RED' }}>
              {prompt.substring(correctIndex, currentIndex)}
            </span>
            <span style={{ color: 'WHITE', textDecoration: 'underline' }}>
              {prompt.substring(currentIndex, currentIndex + 1)}
            </span>
            <span style={{ color: 'WHITE' }}>
              {prompt.substring(currentIndex + 1, prompt.length)}
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
    </>
  )
}
