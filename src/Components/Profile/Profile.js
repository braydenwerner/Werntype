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
    if (signedIn && Object.keys(docData).length > 0 && canvasRef.current) {
      console.log(docData)
      const ctx = canvasRef.current
      Chart.defaults.global.legend.labels.usePointStyle = true
      const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...Array(docData.last10Races.length).keys()].map((i) => ++i),
          datasets: [
            {
              pointStyle: 'rectRot',
              label: 'Last 10 Races',
              data: docData.last10Races,
              borderColor: 'rgb(158, 228, 147)'
            },
            {
              pointStyle: 'rectRot',
              label: 'Average WPM (Last 10 Races)',
              data: [...Array(docData.last10Races.length).keys()].map(
                () => docData.avgLast10Races
              ),
              pointRadius: 0,

              borderColor: 'rgb(258, 128, 147)'
            },
            {
              pointStyle: 'rectRot',
              label: 'Average WPM (All Time)',
              data: [...Array(docData.last10Races.length).keys()].map(
                () => docData.avgWPM
              ),
              pointRadius: 0,

              borderColor: 'rgb(258, 228, 147)'
            }
          ]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'WHITE',
              fontSize: 13
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: 'WHITE'
                },
                scaleLabel: {
                  display: true,
                  fontColor: 'WHITE',
                  fontSize: 18,
                  labelString: 'Words Per Minute'
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'WHITE',
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  fontColor: 'WHITE',
                  fontSize: 18,
                  labelString: 'Race #'
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
                <h2>Best WPM</h2>
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
              <h1>{docData.username}</h1>
              <canvas
                id="profile-graph"
                ref={canvasRef}
                width="500px"
                height="350px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
