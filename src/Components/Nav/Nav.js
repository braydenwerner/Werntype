import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  promptState,
  wordIndexState,
  wordStartIndexState,
  correctIndexState,
  currentIndexState,
  pageState,
  numWordsState
} from '../../atoms/atoms'
import { generateText } from '../../utils/utils'
import images from '../../Image/exports'
import './Nav.scss'

export default function Nav() {
  const setCurrentPrompt = useSetRecoilState(promptState)
  const setCurrentWordIndex = useSetRecoilState(wordIndexState)
  const setCurrentWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCurrentCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)
  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  const numWords = useRecoilValue(numWordsState)

  const handleHomeClick = () => {
    setCurrentPrompt(generateText(numWords))
    setCurrentWordIndex(0)
    setCurrentWordStartIndex(0)
    setCurrentCorrectIndex(0)
    setCurrentIndex(0)
    setCurrentPageState('typingState')
  }

  const handleLeaderBoardClick = () => {
    setCurrentPageState('leaderboardState')
  }

  const handleStatsClick = () => {
    setCurrentPageState('profileState')
  }

  return (
    <>
      {currentPageState !== 'animationState' && (
        <div id="outer-nav-container">
          <img
            className="invertImageColor"
            src={images.home}
            onClick={handleHomeClick}
          />
          <img
            className="invertImageColor"
            src={images.leaderboard}
            onClick={handleLeaderBoardClick}
          />
          <img src={images.profile} onClick={handleStatsClick} />
          <a
            target="_blank"
            href="https://github.com/braydenwerner/werntype"
            rel="noreferrer"
          >
            <img
              className="invertImageColor"
              id="github-nav-link"
              src={images.github}
            />
          </a>
        </div>
      )}
    </>
  )
}
