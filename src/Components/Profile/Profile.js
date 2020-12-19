import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { pageState } from '../../recoil'
import './Profile.scss'

export default function Profile() {
  const currentPageState = useRecoilValue(pageState)

  useEffect(() => {}, [])

  return (
    <>
      {currentPageState === 'profileState' && (
        <div id="outer-stats-container">
          <div>Average WPM (All time)</div>
          <div>Fastest Race</div>
        </div>
      )}
    </>
  )
}
