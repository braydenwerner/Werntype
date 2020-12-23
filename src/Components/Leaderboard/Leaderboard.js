import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { pageState } from '../../atoms/recoil'
import './Leaderboard.scss'
import { useRecoilValue } from 'recoil'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

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
            avgWPM: doc.data().avgWPM,
            totalRaces: doc.data().totalRaces
          }
        })

        //    sort object keys by highest WPM
        Object.keys(scores).sort((a, b) => b.bestWPM - a.bestWPM)
        setBestScores(scores)
      })
  }, [])

  return (
    <>
      {currentPageState === 'leaderboardState' && (
        <div>
          <AnimatedHeader text="Leaderboard" />
          <table id="leaderboard-outer-container">
            <tr>
              <th>Username</th>
              <th>Best WPM</th>
              <th>Average WPM</th>
              <th>Total Races</th>
            </tr>
            {Object.keys(bestScores).map((key) => {
              return (
                <tr id="leaderboard-inner-container" key={key}>
                  <td>{bestScores[key].username}</td>
                  <td>{bestScores[key].bestWPM}</td>
                  <td>{bestScores[key].avgWPM}</td>
                  <td>{bestScores[key].totalRaces}</td>
                </tr>
              )
            })}
          </table>
        </div>
      )}
    </>
  )
}
