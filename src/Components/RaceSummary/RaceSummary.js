import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import {
  promptWordLength,
  pageState,
  segmentedWPMState,
  wpmState
} from '../../atoms/atoms'
import { useRecoilValue } from 'recoil'
import './RaceSummary.scss'

export default function RaceSummary() {
  const page = useRecoilValue(pageState)
  const segmentedWPM = useRecoilValue(segmentedWPMState)
  const WPM = useRecoilValue(wpmState)

  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current
    console.log(segmentedWPM)
    if (segmentedWPM.length > 0) {
      const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...Array(promptWordLength).keys()].map((i) => ++i),
          datasets: [
            {
              label: '',
              data: segmentedWPM,

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
  }, [WPM])

  return (
    <>
      {page === 'summaryState' && (
        <div id="summaryForm-outer-container">
          <canvas id="graph-canvas" ref={canvasRef} />
          <div id="summary-wpm">WPM: {WPM}</div>
        </div>
      )}
    </>
  )
}
