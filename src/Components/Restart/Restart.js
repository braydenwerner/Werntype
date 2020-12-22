import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  correctIndexState,
  currentIndexState,
  pageState,
  promptState,
  wordIndexState,
  wordStartIndexState
} from '../../atoms/recoil'
import { generateText } from '../../util/utils'
import './Restart.scss'

export default function Restart() {
  const setCurrentPrompt = useSetRecoilState(promptState)
  const setCurrentWordIndex = useSetRecoilState(wordIndexState)
  const setCurrentWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCurrentCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)

  const setCurrentPageState = useSetRecoilState(pageState)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') restart()
  }

  const restart = () => {
    setCurrentPrompt(generateText())
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
          Press <div id="escape-key">Escape</div> for quick restart
        </div>
      </div>
    </>
  )
}
