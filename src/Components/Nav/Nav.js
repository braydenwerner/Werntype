import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../recoil'
import homeImage from '../../Image/home.png'
import leaderboardImage from '../../Image/leaderboard-white.png'
import profileImage from '../../Image/profile-white.png'
import './Nav.scss'

export default function Nav() {
  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  const handleLeaderBoardClick = () => {
    setCurrentPageState('leaderboardState')
  }

  const handleStatsClick = () => {
    setCurrentPageState('profileState')
  }

  const handleHomeClick = () => {
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
