import React, { useRef, useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { pageState, signedInState } from '../../recoil'
import { app, auth, db } from '../../firebase'
import './Profile.scss'

export default function Profile() {
  const signinRefEmail = useRef(null)
  const signinRefPassword = useRef(null)
  const signupRefEmail = useRef(null)
  const signupRefPassword = useRef(null)

  const currentPageState = useRecoilValue(pageState)
  const [signedIn, setSignedIn] = useRecoilState(signedInState)

  const [errorMessage, setErrorMessage] = useState('')
  const [docData, setDocData] = useState({})

  const signin = (e) => {
    e.preventDefault()
    console.log('signin')
    auth
      .signInWithEmailAndPassword(
        signinRefEmail.current.value,
        signinRefPassword.current.value
      )
      .catch((error) => {
        const errorMessage = error.message
        setErrorMessage(errorMessage)
      })
  }

  const signup = (e) => {
    e.preventDefault()
    console.log('signup')

    auth
      .createUserWithEmailAndPassword(
        signupRefEmail.current.value,
        signupRefPassword.current.value
      )
      .catch((error) => {
        const errorMessage = error.message
        setErrorMessage(errorMessage)
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setErrorMessage('')
        setSignedIn(true)

        const docRef = db.collection('users').doc(user.email)
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setDocData({
                email: user.email,
                ...doc.data()
              })
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      } else {
        setSignedIn(false)
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
              <h1>{docData.email}</h1>
              <h2>Average WPM (All time): {docData.avgWPM}</h2>
              <h2>Fastest Race: {docData.bestWPM}</h2>
            </div>
          )}
          {!signedIn && (
            <div id="outer-form-signin">
              <form id="signin-container">
                <input
                  type="text"
                  placeholder="email"
                  required
                  ref={signinRefEmail}
                />
                <input
                  type="text"
                  placeholder="password"
                  required
                  ref={signinRefPassword}
                />
                <button type="login-input-button" onClick={signin}>
                  Login
                </button>
              </form>

              <form id="signup-container">
                <input
                  type="text"
                  placeholder="email"
                  required
                  ref={signupRefEmail}
                />
                <input
                  type="text"
                  placeholder="password"
                  required
                  ref={signupRefPassword}
                />
                <button type="submit" onClick={signup}>
                  Sign Up
                </button>
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
