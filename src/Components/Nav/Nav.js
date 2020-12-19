import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../recoil'
import './Nav.scss'

export default function Nav() {
  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

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
          <div id="leaderboard-nav-link" onClick={handleLeaderBoardClick} />
          <div id="profile-nav-link" onClick={handleStatsClick} />
        </div>
      )}
    </>
  )
}
