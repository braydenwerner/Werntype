import React, { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { pageState, signedInState, docDataState } from '../../atoms/atoms'
import { db, auth } from '../../firebase'
import './Profile.scss'

export default function Profile() {
  const [signedIn, setSignedIn] = useRecoilState(signedInState)
  const [page, setPage] = useRecoilState(pageState)

  const docData = useRecoilValue(docDataState)

  const canvasRef = useRef(null)

  useEffect(() => {
    //  if there exists a valid refernce to canvas, draw a graph
    console.log(signedIn)
    console.log(Object.keys(docData).length > 0)
    console.log(canvasRef.current)
    console.log(page)

    if (signedIn && Object.keys(docData).length > 0 && canvasRef.current) {
      console.log(docData)
      const ctx = canvasRef.current
      const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...Array(docData.last10Races.length).keys()].map((i) => ++i),
          datasets: [
            {
              label: '',
              data: docData.last10Races,

              borderColor: 'rgb(158, 228, 147)'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'WPM'
                }
              }
            ]
          }
        }
      })
    }
  }, [page, signedIn, canvasRef.current, docData])

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
          <h1>{docData.username}</h1>
          <div id="outer-stats-column-container">
            <div id="stats-column1-container">
              <div className="stat-box">
                <div className="stat-box-data">{docData.avgWPM}</div>
                <h2>Average WPM (All Time)</h2>
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
              <button onClick={signOut}>Sign out</button>
            </div>

            <div id="stats-column2-container">
              <canvas
                id="profile-graph"
                ref={canvasRef}
                width="500px"
                height="450px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
