import React, { useRef, useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { pageState, signedInState, docDataState } from '../../atoms/atoms'
import { auth, db } from '../../firebase'
import './Profile.scss'
import AnimatedHeader from '../AnimatedHeader/AnimatedHeader'

export default function Profile() {
  const signinRefEmail = useRef(null)
  const signinRefPassword = useRef(null)
  const signupRefEmail = useRef(null)
  const signupRefUsername = useRef(null)
  const signupRefPassword = useRef(null)
  const signupRefPasswordConfirm = useRef(null)

  const currentPageState = useRecoilValue(pageState)
  const [signedIn, setSignedIn] = useRecoilState(signedInState)
  const [docData, setDocData] = useRecoilState(docDataState)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //  detects sign in, sign out. retrieves data and runs setDocData() to render
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      setSignedIn(true)
    } else {
      signOut()
    }
  }, [])

  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(
        signinRefEmail.current.value,
        signinRefPassword.current.value
      )
      .then(() => {
        if (auth.currentUser.emailVerified) {
          //  console.log(`the email ${auth.currentUser.email} has been verified`)
          const docRef = db.collection('users').doc(auth.currentUser.email)

          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                //  console.log('doc.data(): ', doc.data())
                setDocData({
                  email: auth.currentUser.email,
                  ...doc.data()
                })
              }

              setSignedIn(true)
            })
            .catch((error) => {
              handleError(error.message)
            })
        } else {
          handleError(
            'You must verify your email before signing in! We are sending another verification email.'
          )
          sendVerificantionEmail()
        }
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  //  sign up, add defaul values to database
  const signUp = (e) => {
    e.preventDefault()

    if (
      signupRefPassword.current.value !== signupRefPasswordConfirm.current.value
    ) {
      handleError('Passwords do not match.')
      return
    }

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
              signupRefEmail.current.value = ''
              signupRefUsername.current.value = ''
              signupRefPassword.current.value = ''
              signupRefPasswordConfirm.current.value = ''

              db.collection('users')
                .doc(email)
                .set({
                  email: email,
                  username: username,
                  bestWPM: 0,
                  avgWPM: 0,
                  lastWPM: 0,
                  totalRaces: 0,
                  points: 0
                })
                .catch((error) => {
                  handleError(error.message)
                })

              sendVerificantionEmail()
            })
            .catch((error) => {
              handleError(error.message)
            })
        } else {
          handleError('Username already exists')
        }
      })
      .catch((error) => {
        handleError(error.message)
      })
  }

  const sendVerificantionEmail = () => {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setMessage(
          'A confirmation email was sent. Confirm to activate your account!'
        )
      })
      .catch((error) => {
        handleError(error.code)
      })
  }

  const handleError = (error) => {
    if (message !== '') setMessage('')
    setErrorMessage(error)
    const unsetErrorInterval = setInterval(() => setErrorMessage(' '), 5000)
    setTimeout(() => clearInterval(unsetErrorInterval), 5000)
  }

  const signOut = () => {
    auth.signOut().catch((error) => {
      handleError(error.message)
    })

    setSignedIn(false)
  }

  //  contains nested component AnimatedHeader
  return (
    <>
      {currentPageState === 'profileState' && (
        <div id="outer-profile-container">
          <div id="outer-stats-container">
            {signedIn && (
              <div id="inner-stats-container">
                <AnimatedHeader text="Profile" />
                <h1>{docData.username}</h1>
                <img src={auth.currentUser.photoURL} />
                <div id="inner-stats-row">
                  <h2>Average WPM</h2>
                  <div className="stat-box">{docData.avgWPM}</div>
                  <h2>Fastest WPM</h2>
                  <div className="stat-box">{docData.bestWPM}</div>
                  <h2>Last WPM</h2>
                  <div className="stat-box">{docData.lastWPM}</div>
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
                      autoComplete="on"
                    />
                    <input
                      type="password"
                      placeholder="password"
                      required
                      ref={signinRefPassword}
                      autoComplete="on"
                    />
                    <button onClick={signIn}>Login</button>
                  </form>

                  <form id="signup-container">
                    <input
                      type="text"
                      placeholder="email"
                      required
                      ref={signupRefEmail}
                      autoComplete="on"
                    />
                    <input
                      type="text"
                      placeholder="username"
                      maxLength="20"
                      required
                      ref={signupRefUsername}
                      autoComplete="on"
                    />
                    <input
                      type="password"
                      placeholder="password"
                      required
                      ref={signupRefPassword}
                      autoComplete="on"
                    />
                    <input
                      type="password"
                      placeholder="confirm password"
                      required
                      ref={signupRefPasswordConfirm}
                      autoComplete="on"
                    />
                    <button type="submit" onClick={signUp}>
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="notification-container">
        {message !== '' && currentPageState === 'profileState' && (
          <div id="message">{message}</div>
        )}

        {!signedIn &&
          errorMessage !== '' &&
          currentPageState === 'profileState' && (
            <div id="error-message">{errorMessage}</div>
          )}
      </div>
    </>
  )
}
