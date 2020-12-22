import React, { useRef, useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { pageState, signedInState } from '../../recoil'
import { app, auth, db } from '../../firebase'
import './Profile.scss'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Profile() {
  const signinRefEmail = useRef(null)
  const signinRefPassword = useRef(null)
  const signupRefEmail = useRef(null)
  const signupRefUsername = useRef(null)
  const signupRefPassword = useRef(null)

  const currentPageState = useRecoilValue(pageState)
  const [signedIn, setSignedIn] = useRecoilState(signedInState)

  const [errorMessage, setErrorMessage] = useState('')
  const [docData, setDocData] = useState({})

  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(
        signinRefEmail.current.value,
        signinRefPassword.current.value
      )
      .catch((error) => {
        handleError(error.message)
      })
  }

  //  sign up, add defaul values to database
  const signUp = (e) => {
    e.preventDefault()
    const email = signupRefEmail.current.value
    const username = signupRefUsername.current.value
    const password = signupRefPassword.current.value

    //  check to make sure username not already in database
    db.collection('users')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              db.collection('users')
                .doc(email)
                .set({
                  email: email,
                  username: username,
                  bestWPM: 0,
                  avgWPM: 0
                })
                .catch((error) => {
                  handleError(error.message)
                })
            })
            .catch((error) => {
              handleError(error.message)
            })
        } else {
          handleError('Username already exists')
        }
      })
      .catch(function (error) {
        handleError(error.message)
      })
  }

  const handleError = (error) => {
    setErrorMessage(error)
    const unsetErrorInterval = setInterval(() => setErrorMessage(' '), 5000)
    setTimeout(() => clearInterval(unsetErrorInterval), 5000)
  }

  const signOut = () => {
    auth.signOut().catch((error) => {
      handleError(error.message)
    })
  }

  //  detects sign in, sign out. retrieves data and runs setDocData() to render
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setErrorMessage('')
        setSignedIn(true)

        const docRef = db.collection('users').doc(user.email)
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setDocData({
                email: user.email,
                ...doc.data()
              })
            }
          })
          .catch((error) => {
            handleError(error.message)
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
              <AnimatedHeader text="Profile" />
              <h1>{docData.username}</h1>
              <div id="inner-stats-row">
                <h2>Average WPM</h2>
                <div className="stat-box">{docData.avgWPM} WPM</div>
                <h2>Fastest WPM</h2>
                <div className="stat-box">{docData.bestWPM} WPM</div>
                <h2>Last WPM</h2>
                <div className="stat-box">{docData.lastWPM} WPM</div>
                <h2>Total Races</h2>
                <div className="stat-box">{docData.totalRaces}</div>
              </div>
              <button onClick={signOut}>Sign out</button>
            </div>
          )}
          {!signedIn && (
            <div id="outer-signin-container">
              <AnimatedHeader text="Sign In To See Profile" />
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
                  <button type="login-input-button" onClick={signIn}>
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
                    placeholder="username"
                    required
                    ref={signupRefUsername}
                  />
                  <input
                    type="text"
                    placeholder="password"
                    required
                    ref={signupRefPassword}
                  />
                  <button type="submit" onClick={signUp}>
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      <div id="error-container">
        {errorMessage !== '' && currentPageState === 'profileState' && (
          <div id="error-message">{errorMessage}</div>
        )}
      </div>
    </div>
  )
}
