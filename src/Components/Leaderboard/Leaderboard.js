import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { pageState } from '../../atoms/atoms'
import './Leaderboard.scss'
import { useRecoilValue } from 'recoil'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Leaderboard() {
  const currentPageState = useRecoilValue(pageState)
  const [bestScores, setBestScores] = useState([])
  let isPrimary = true

  useEffect(() => {
    const scores = []
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scores.push({
            username: doc.data().username,
            bestWPM: doc.data().bestWPM,
            avgWPM: doc.data().avgWPM,
            totalRaces: doc.data().totalRaces
          })
        })

        scores.sort((a, b) => b.bestWPM - a.bestWPM)
        setBestScores(scores)
      })
  }, [])

  return (
    <>
      {currentPageState === 'leaderboardState' && (
        <div id="leaderboard-outer-container">
          <AnimatedHeader text="Leaderboard" />
          <table id="leaderboard-table" rules="none">
            <thead>
              <tr
                id="leaderboard-header-row"
                className={`isPrimaryColor-${isPrimary}`}
              >
                <th>Username</th>
                <th>Best WPM</th>
                <th>Average WPM</th>
                <th>Total Races</th>
              </tr>
            </thead>
            {bestScores.map((score, i) => {
              isPrimary = !isPrimary

              return (
                <tbody key={i}>
                  <tr
                    id="leaderboard-inner-row"
                    className={`isPrimaryColor-${isPrimary}`}
                  >
                    <td>{score.username}</td>
                    <td>{score.bestWPM}</td>
                    <td>{score.avgWPM}</td>
                    <td>{score.totalRaces}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      )}
    </>
  )
}
