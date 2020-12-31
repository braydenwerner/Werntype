import React from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { pageState, signedInState, docDataState } from '../../atoms/atoms'
import { auth } from '../../firebase'
import './Profile.scss'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Profile() {
  const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

  const setSignedIn = useSetRecoilState(signedInState)

  const docData = useRecoilValue(docDataState)

  const signOut = () => {
    console.log('signing out from profile')
    auth.signOut().catch((error) => {
      console.log(error)
    })

    setSignedIn(false)
    setCurrentPageState('signInState')
  }

  return (
    <>
      {currentPageState === 'profileState' && (
        <div id="outer-stats-container">
          <div id="inner-stats-container">
            <h1>{docData.username}</h1>
            <div id="inner-stats-row">
              <div className="stat-box">
                <div className="stat-box-data">{docData.avgWPM}</div>
                <h2>Average WPM</h2>
              </div>
              <div className="stat-box">
                <div className="stat-box-data">{docData.bestWPM}</div>
                <h2>Fastest WPM</h2>
              </div>
              <div className="stat-box">
                <div className="stat-box-data">{docData.lastWPM}</div>
                <h2>Last WPM</h2>
              </div>
              <div className="stat-box">
                <div className="stat-box-data">{docData.totalRaces}</div>
                <h2>Total Races</h2>
              </div>
            </div>
            <button onClick={signOut}>Sign out</button>
          </div>
        </div>
      )}
    </>
  )
}
