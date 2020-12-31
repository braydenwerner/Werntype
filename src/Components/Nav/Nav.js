import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  promptState,
  wordIndexState,
  wordStartIndexState,
  correctIndexState,
  currentIndexState,
  pageState,
  numWordsState,
  signedInState,
  segmentedWPMState
} from '../../atoms/atoms'
import { generateText } from '../../utils/utils'
import images from '../../Image/exports'
import './Nav.scss'

export default function Nav() {
  const setPrompt = useSetRecoilState(promptState)
  const setWordIndex = useSetRecoilState(wordIndexState)
  const setWordStartIndex = useSetRecoilState(wordStartIndexState)
  const setCorrectIndex = useSetRecoilState(correctIndexState)
  const setCurrentIndex = useSetRecoilState(currentIndexState)
  const setSegmentedWPM = useSetRecoilState(segmentedWPMState)

  const [page, setPage] = useRecoilState(pageState)

  const numWords = useRecoilValue(numWordsState)
  const signedIn = useRecoilValue(signedInState)

  const pageStates = ['typingState', 'leaderboardState', 'profile/signIn']

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
    //  event listeners act different with useState. React thinks new function each time,
    //  https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
    //  therefore need currentPageState as a dependency
  }, [page])

  const handleKeyDown = (e) => {
    let pageIndex
    if (e.key === '`') {
      setPage((oldPage) => {
        if (oldPage === 'profileState' || oldPage === 'signInState') {
          pageIndex = pageStates.indexOf('profile/signIn')
        } else {
          pageIndex = pageStates.indexOf(oldPage)
        }

        if (pageIndex < pageStates.length - 1) pageIndex++
        else pageIndex = 0

        if (pageStates[pageIndex] === 'profile/signIn') {
          return signedIn ? 'profileState' : 'signInState'
        }

        return pageStates[pageIndex]
      })

      if (pageIndex === 0) resetTypingState()
    }
  }

  const handleHomeClick = () => {
    resetTypingState()
    setPage('typingState')
  }

  const handleLeaderBoardClick = () => {
    setPage('leaderboardState')
  }

  const handleStatsClick = () => {
    if (!signedIn) setPage('signInState')
    else setPage('profileState')
  }

  const resetTypingState = () => {
    setPrompt(generateText(numWords))
    setWordIndex(0)
    setWordStartIndex(0)
    setCorrectIndex(0)
    setCurrentIndex(0)
    setSegmentedWPM([])
  }

  return (
    <>
      {page !== 'animationState' && (
        <div id="outer-nav-container">
          <div id="inner-nav-container">
            <img
              className={`nav-typingState-${
                page === 'typingState' ? 'true' : 'false'
              }`}
              id="homeImage"
              src={images.home}
              onClick={handleHomeClick}
            />
            <img
              className={`nav-leaderboardState-${
                page === 'leaderboardState' ? 'true' : 'false'
              }`}
              id="leaderboardImage"
              src={images.leaderboard}
              onClick={handleLeaderBoardClick}
            />
            <img
              className={`nav-profileState-${
                page === 'profileState' || page === 'signInState'
                  ? 'true'
                  : 'false'
              }`}
              src={images.profile}
              onClick={handleStatsClick}
            />
          </div>
          <div id="nav-shortcut-text">
            <div id="tilde-key">`</div>- Next Page
          </div>
        </div>
      )}
    </>
  )
}
