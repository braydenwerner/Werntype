import React from 'react'
import { pageState, wpmState } from '../../atoms/atoms'
import { useRecoilValue } from 'recoil'
import './RaceSummary.scss'

export default function RaceSummary() {
  const currentPageState = useRecoilValue(pageState)
  const WPM = useRecoilValue(wpmState)
  return (
    <>
      {currentPageState === 'summaryState' && (
        <div id="summaryForm-outer-container">
          <div id="summary-wpm">WPM: {WPM}</div>
        </div>
      )}
    </>
  )
}
