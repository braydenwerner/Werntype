import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState,
  numWordsState
} from '../../atoms/atoms'
import { generateText } from '../../utils/utils'
import './Restart.scss'

export default function Restart() {
  const setCurrentPrompt = useSetRecoilState(promptState)
  const setCurrentWordIndex = useSetRecoilState(wordIndexState)
  const setCurrentWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCurrentCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)
  const setCurrentPageState = useSetRecoilState(pageState)

  const numWords = useRecoilValue(numWordsState)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') restart()
  }

  const restart = () => {
    setCurrentPrompt(generateText(numWords))
    setCurrentWordIndex(0)
    setCurrentWordStartIndex(0)
    setCurrentCorrectIndex(0)
    setCurrentIndex(0)
    setCurrentPageState('typingState')
  }

  return (
    <>
      <div id="inner-restart-container">
        <div id="restart-image" onClick={restart} />
        <div id="restart-text">
          <div id="escape-key">Escape</div>- Quick Restart
        </div>
      </div>
    </>
  )
}
