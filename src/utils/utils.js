import words from './words'

export const randGen = (length) => {
  return Math.floor(Math.random() * length)
}

export const generateText = (length) => {
  let text = ''
  for (let i = 0; i < length; i++) {
    text += words[randGen(words.length)]

    if (i !== length - 1) text += ' '
  }

  return text
}
