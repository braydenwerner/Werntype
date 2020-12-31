import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState,
  numWordsState,
  segmentedWPMState
} from '../../atoms/atoms'
import { generateText } from '../../utils/utils'
import './Restart.scss'

export default function Restart() {
  const setPrompt = useSetRecoilState(promptState)
  const setWordIndex = useSetRecoilState(wordIndexState)
  const setWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)
  const setSegmentedWPM = useSetRecoilState(segmentedWPMState)
  const setPage = useSetRecoilState(pageState)

  const numWords = useRecoilValue(numWordsState)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') restart()
  }

  const restart = () => {
    setPrompt(generateText(numWords))
    setWordIndex(0)
    setWordStartIndex(0)
    setCorrectIndex(0)
    setCurrentIndex(0)
    setSegmentedWPM([])
    setPage('typingState')
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
