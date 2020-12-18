import React, { useState } from 'react'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import {
  formState,
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState
} from '../../recoil'
import { generateText } from '../../utils'
import './Restart.scss'

export default function Restart() {
  const setCurrentPrompt = useSetRecoilState(promptState)
  const setCurrentWordIndex = useSetRecoilState(wordIndexState)
  const setCurrentWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCurrentCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)
  const formValue = useRecoilValue(formState)

  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  const handleClick = () => {
    setCurrentPrompt(generateText())
    setCurrentWordIndex(0)
    setCurrentWordStartIndex(0)
    setCurrentCorrectIndex(0)
    setCurrentIndex(0)
    setCurrentPageState('typingState')
    formValue.current.value = ''
  }

  return (
    <>
      {(currentPageState === 'typingState' ||
        currentPageState === 'summaryState') && (
        <div id="restart-image" onClick={handleClick} />
      )}
    </>
  )
}
