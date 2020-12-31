import words from './words'

export const randGen = (length) => {
  return Math.floor(Math.random() * length)
}

export const generateText = (length) => {
  let text = ''
  let lastWord = ''
  for (let i = 0; i < length; i++) {
    let randWord = words[randGen(words.length)]

    //  do not same word consecutively
    while (lastWord === randWord) {
      randWord = words[randGen(words.length)]
    }

    lastWord = randWord
    text += randWord
    if (i !== length - 1) text += ' '
  }

  return text
}
