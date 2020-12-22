import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { pageState } from '../../atoms/recoil'
import './Leaderboard.scss'
import { useRecoilValue } from 'recoil'

export default function Leaderboard() {
  const currentPageState = useRecoilValue(pageState)
  const [bestScores, setBestScores] = useState({})

  useEffect(() => {
    const scores = {}
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scores[doc.data().username] = {
            username: doc.data().username,
            bestWPM: doc.data().bestWPM,
            avgWPM: doc.data().avgWPM
          }
        })

        //    sort object keys by highest WPM
        Object.keys(scores).sort((a, b) => b.bestWPM - a.bestWPM)
        setBestScores(scores)
      })
  }, [])

  return (
    <div id="leaderboard-outer-container">
      {currentPageState === 'leaderboardState' &&
        Object.keys(bestScores).map((key) => {
          console.log(bestScores)
          console.log(key)
          return (
            <div id="leaderboard-inner-container" key={key}>
              <div>{bestScores[key].username}</div>
              <div>{bestScores[key].bestWPM}</div>
              <div>{bestScores[key].avgWPM}</div>
            </div>
          )
        })}
    </div>
  )
}
