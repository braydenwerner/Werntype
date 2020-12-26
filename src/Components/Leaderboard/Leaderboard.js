import React, { useRef, useState, useEffect } from 'react'
import { db } from '../../firebase'
import { pageState } from '../../atoms/atoms'
import './Leaderboard.scss'
import { useRecoilValue } from 'recoil'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Leaderboard() {
  const dropDownRef = useRef(null)

  const currentPageState = useRecoilValue(pageState)

  const [bestScores, setBestScores] = useState([])
  const [sortBy, setSortBy] = useState('bestWPM')

  let isPrimary = true

  useEffect(() => {
    const snapshot = db.collection('users').onSnapshot((querySnapshot) => {
      let scores = []
      querySnapshot.forEach((doc) => {
        scores.push({
          username: doc.data().username,
          bestWPM: doc.data().bestWPM,
          avgWPM: doc.data().avgWPM,
          totalRaces: doc.data().totalRaces
        })
      })

      if (sortBy === 'bestWPM') {
        scores.sort((a, b) => b.bestWPM - a.bestWPM)
      } else if (sortBy === 'averageWPM') {
        scores.sort((a, b) => b.avgWPM - a.avgWPM)
      } else if (sortBy === 'totalRaces') {
        scores.sort((a, b) => b.totalRaces - a.totalRaces)
      }

      //  take top 8 scores
      scores = scores.splice(0, 8)

      setBestScores(scores)
    })

    return () => snapshot()
  }, [])

  useEffect(() => {
    const scores = [...bestScores]

    if (sortBy === 'bestWPM') {
      scores.sort((a, b) => b.bestWPM - a.bestWPM)
    } else if (sortBy === 'averageWPM') {
      scores.sort((a, b) => b.avgWPM - a.avgWPM)
    } else if (sortBy === 'totalRaces') {
      scores.sort((a, b) => b.totalRaces - a.totalRaces)
    }

    setBestScores(scores)
  }, [sortBy])

  const handleDropdown = () => {
    setSortBy(dropDownRef.current.value)
  }

  return (
    <>
      {currentPageState === 'leaderboardState' && (
        <div id="leaderboard-outer-container">
          <AnimatedHeader text="Leaderboard" />
          <div id="leaderboard-select-container">
            <label id="leaderboard-label"> Sorting by</label>
            <select
              id="leaderboard-select"
              name="leaderboard-select"
              onChange={handleDropdown}
              ref={dropDownRef}
            >
              <option value="bestWPM">Best WPM</option>
              <option value="averageWPM">Average WPM</option>
              <option value="totalRaces">Total Races</option>
            </select>
          </div>
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
