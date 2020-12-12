import React, { useEffect } from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'
//  import { useCollectionData } from 'react-firebase-hooks/firestore'

import { useRecoilState } from 'recoil'
import { names as namesAtom } from './recoil'

import { Table } from './Components/exports'

firebase.initializeApp({
  apiKey: 'AIzaSyBnYq6UUlI8u0YDSvbdOyt6kDWugCoZEgU',
  authDomain: 'react-recoil-firebase.firebaseapp.com',
  projectId: 'react-recoil-firebase',
  storageBucket: 'react-recoil-firebase.appspot.com',
  messagingSenderId: '580728761591',
  appId: '1:580728761591:web:a823e324d9592c06c9b7f2',
  measurementId: 'G-2TX1FM7XQT'
})

const firestore = firebase.firestore()

function App() {
  const [names, setNames] = useRecoilState(namesAtom)

  async function getData() {
    const nameArray = []
    const userRef = firestore.collection('users')
    const snapshot = await userRef.get()

    snapshot.forEach(doc => {
      console.log(names)
      nameArray.push(doc.data().Name)
    })

    setNames(nameArray)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Table />
    </>
  )
}

export default App
