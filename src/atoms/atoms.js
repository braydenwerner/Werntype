import { atom } from 'recoil'
import { generateText } from '../utils/utils'

export const promptState = atom({
  key: 'promptState',
  default: generateText(25)
})

export const wordIndexState = atom({
  key: 'wordIndexState',
  default: 0
})

export const wordStartIndexState = atom({
  key: 'wordStartIndexState',
  default: 0
})

export const correctIndexState = atom({
  key: 'correctIndexState',
  default: 0
})

export const currentIndexState = atom({
  key: 'currentIndexState',
  default: 0
})

export const numWordsState = atom({
  key: 'numWordsState',
  default: 20
})

export const pageState = atom({
  key: 'pageState',
  default: 'typingState'
})

export const wpmState = atom({
  key: 'wpmState',
  default: 0
})

export const signedInState = atom({
  key: 'signedInState',
  default: false
})

export const docDataState = atom({
  key: 'docDataState',
  default: {}
})
