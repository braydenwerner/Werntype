import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { pageState, signedInState, docDataState } from '../../atoms/atoms'
import { db, auth } from '../../firebase'
import './Profile.scss'

export default function Profile() {
  const [signedIn, setSignedIn] = useRecoilState(signedInState)
  const [page, setPage] = useRecoilState(pageState)

  const docData = useRecoilValue(docDataState)

  useEffect(() => {
    //  last 10 wpm avg added late, have to add it to doc if doesn't exist
    if (signedIn) {
      console.log(docData)
      if (!docData.avgLast10Races || !docData.last10Races) {
        //  create it
        db.collection('users')
          .doc(docData.email)
          .set({
            ...docData,
            avgLast10Races: 'No races yet',
            last10Races: []
          })
      }
    }
  }, [docData])

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.log(error)
    })

    setSignedIn(false)
    localStorage.removeItem('user')
    setPage('signInState')
  }

  return (
    <>
      {page === 'profileState' && signedIn && (
        <div id="outer-stats-container">
          <div id="inner-stats-container">
            <h1>{docData.username}</h1>
            <div id="inner-stats-row">
              <div className="stat-box">
                <div className="stat-box-data">{docData.avgWPM}</div>
                <h2>Average WPM</h2>
              </div>
              <div className="stat-box">
                <div className="stat-box-data">
                  {docData.avgLast10Races ? docData.avgLast10Races : 0}
                </div>
                <h2>Average WPM (Last 10 Races)</h2>
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
