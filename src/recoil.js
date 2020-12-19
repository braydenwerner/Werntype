import { atom } from 'recoil'
import { generateText } from './utils'

export const promptState = atom({
  key: 'promptState',
  default: generateText()
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

export const pageState = atom({
  key: 'pageState',
  default: 'typingState'
})

export const wpmState = atom({
  key: 'wpmState',
  default: 0
})
