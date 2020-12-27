import React, { useEffect } from 'react'
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
    let currentPageIndex
    if (e.key === '`') {
      setCurrentPageState((oldPageState) => {
        currentPageIndex = pageStates.indexOf(oldPageState)

        if (currentPageIndex < pageStates.length - 1) {
          currentPageIndex++
        } else {
          currentPageIndex = 0
        }
        return pageStates[currentPageIndex]
      })

      if (currentPageIndex === 0) resetTypingState()
    }
  }

  const handleHomeClick = () => {
    resetTypingState()
    setCurrentPageState('typingState')
  }

  const handleLeaderBoardClick = () => {
    setCurrentPageState('leaderboardState')
  }

  const handleStatsClick = () => {
    setCurrentPageState('profileState')
  }

  const resetTypingState = () => {
    setCurrentPrompt(generateText(numWords))
    setCurrentWordIndex(0)
    setCurrentWordStartIndex(0)
    setCurrentCorrectIndex(0)
    setCurrentIndex(0)
  }

  return (
    <>
      {currentPageState !== 'animationState' && (
        <div id="outer-nav-container">
          <div id="inner-nav-container">
            <img
              className={`nav-typingState-${
                currentPageState === 'typingState' ? 'true' : 'false'
              }`}
              id="homeImage"
              src={images.home}
              onClick={handleHomeClick}
            />
            <img
              className={`nav-leaderboardState-${
                currentPageState === 'leaderboardState' ? 'true' : 'false'
              }`}
              id="leaderboardImage"
              src={images.leaderboard}
              onClick={handleLeaderBoardClick}
            />
            <img
              className={`nav-profileState-${
                currentPageState === 'profileState' ? 'true' : 'false'
              }`}
              src={images.profile}
              onClick={handleStatsClick}
            />
            <a
              target="_blank"
              href="https://github.com/braydenwerner/werntype"
              rel="noreferrer"
            >
              <img id="githubImage" src={images.github} />
            </a>
          </div>
          <div id="nav-shortcut-text">
            <div id="tilde-key">`</div>- Next Page
          </div>
        </div>
      )}
    </>
  )
}
