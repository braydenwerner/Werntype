import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  promptState,
  wordIndexState,
  wordStartIndexState,
  correctIndexState,
  currentIndexState,
  pageState
} from '../../recoil'
import { generateText } from '../../utils'
import homeImage from '../../Image/home.png'
import leaderboardImage from '../../Image/leaderboard-white.png'
import profileImage from '../../Image/profile-white.png'
import './Nav.scss'

export default function Nav() {
  const setCurrentPrompt = useSetRecoilState(promptState)
  const setCurrentWordIndex = useSetRecoilState(wordIndexState)
  const setCurrentWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCurrentCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)

  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  const handleLeaderBoardClick = () => {
    setCurrentPageState('leaderboardState')
  }

  const handleStatsClick = () => {
    setCurrentPageState('profileState')
  }

  const handleHomeClick = () => {
    setCurrentPrompt(generateText())
    setCurrentWordIndex(0)
    setCurrentWordStartIndex(0)
    setCurrentCorrectIndex(0)
    setCurrentIndex(0)
    setCurrentPageState('typingState')
  }

  return (
    <>
      {currentPageState !== 'animationState' && (
        <div id="outer-nav-container">
          <img id="home-nav-link" src={homeImage} onClick={handleHomeClick} />
          <img
            id="leaderboard-nav-link"
            src={leaderboardImage}
            onClick={handleLeaderBoardClick}
          />
          <img src={profileImage} onClick={handleStatsClick} />
        </div>
      )}
    </>
  )
}
