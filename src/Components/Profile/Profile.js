import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { pageState, signedInState, docDataState } from '../../atoms/atoms'
import { auth, db } from '../../firebase'
import './Profile.scss'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Profile() {
  const currentPageState = useRecoilValue(pageState)
  const [signedIn, setSignedIn] = useRecoilState(signedInState)
  const [docData, setDocData] = useRecoilState(docDataState)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signOut = () => {
    //  sign out, change state to signInState
    auth.signOut().catch((error) => {
      handleError(error.message)
    })

    setSignedIn(false)
  }

  return (
    <>
      {currentPageState === 'profileState' && (
        <div id="inner-stats-container">
          <AnimatedHeader text="Profile" />
          <h1>{docData.username}</h1>
          <img src={auth.currentUser.photoURL} />
          <div id="inner-stats-row">
            <h2>Average WPM</h2>
            <div className="stat-box">{docData.avgWPM}</div>
            <h2>Fastest WPM</h2>
            <div className="stat-box">{docData.bestWPM}</div>
            <h2>Last WPM</h2>
            <div className="stat-box">{docData.lastWPM}</div>
            <h2>Total Races</h2>
            <div className="stat-box">{docData.totalRaces}</div>
          </div>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </>
  )
}
