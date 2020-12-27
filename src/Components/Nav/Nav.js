import React, { useState, useEffect } from 'react'
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

  const pageStates = ['typingState', 'leaderboardState', 'profileState']

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  //  event listeners act different with useState. React thinks new function each time,
  //  currentPageState will always be initial value.
  //  https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
  const handleKeyDown = (e) => {
    if (
      /^[0-9]$/.test(e.key) &&
      parseInt(e.key) <= pageStates.length &&
      parseInt(e.key) >= 1
    ) {
      setCurrentPageState(pageStates[parseInt(e.key) - 1])
    }
  }

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
          <div id="inner-nav-container">
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
          <div id="nav-shortcut-text">
            <div id="number-key">#</div> - Go to page
          </div>
        </div>
      )}
    </>
  )
}
