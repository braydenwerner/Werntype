import { atom } from 'recoil'
import { generateText } from '../utils/utils'

const promptWordLength = 15

export const promptState = atom({
  key: 'promptState',
  default: generateText(promptWordLength)
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
  default: promptWordLength
})

export const pageState = atom({
  key: 'pageState',
  default: 'typingState'
})

export const wpmState = atom({
  key: 'wpmState',
  default: 0
})

export const docDataState = atom({
  key: 'docDataState',
  default: {}
})

export const signedInState = atom({
  key: 'signedInState',
  default: false
})
