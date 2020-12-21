import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { pageState, signedInState } from '../../recoil'
import { app, auth, provider } from '../../firebase'
import './Profile.scss'

export default function Profile() {
  const currentPageState = useRecoilValue(pageState)
  const [signedIn, setSignedIn] = useRecoilState(signedInState)
  const [errorMessage, setErrorMessage] = useState('')

  const createAccount = (email, password) => {
    auth
      .createUserWithEmailAndPassword('email54@gmail.com', 'password')
      .then((user) => {
        setErrorMessage('')
      })
      .catch((error) => {
        const errorMessage = error.message
        setErrorMessage(errorMessage)
      })
  }

  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {})
      .catch((error) => {
        const errorMessage = error.message
        setErrorMessage(errorMessage)
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const email = user.email
        console.log('email: ', email, ' just logged on')
        setSignedIn(true)
      } else {
        setSignedIn(false)
        console.log('user signed out')
      }
    })
  }, [])

  //  contains nested component AnimatedHeader
  return (
    <div id="outer-profile-container">
      {currentPageState === 'profileState' && (
        <div id="outer-stats-container">
          {errorMessage === '' && signedIn && (
            <div id="inner-stats-container">
              <div>Average WPM (All time)</div>
              <div>Fastest Race</div>
            </div>
          )}
          {!signedIn && (
            <div id="outer-form-login">
              <form id="login-container">
                <input type="text" placeholder="username" required />
                <input type="text" placeholder="password" required />
                <button type="login-input-button">Login</button>
              </form>

              <form id="signup-container">
                <input type="text" placeholder="username" required />
                <input type="text" placeholder="password" required />
                <button type="submit">Sign Up</button>
              </form>
              <div id="error-container">
                {errorMessage !== '' && (
                  <div id="error-message">{errorMessage}</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
