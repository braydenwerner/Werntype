const nouns = [
  'bird',
  'clock',
  'boy',
  'plastic',
  'duck',
  'teacher',
  'old lady',
  'professor',
  'hamster',
  'dog'
]
const verbs = [
  'kicked',
  'ran',
  'flew',
  'dodged',
  'sliced',
  'rolled',
  'died',
  'breathed',
  'slept',
  'killed'
]
const adjectives = [
  'beautiful',
  'lazy',
  'professional',
  'lovely',
  'dumb',
  'rough',
  'soft',
  'hot',
  'vibrating',
  'slimy'
]
const adverbs = [
  'slowly',
  'elegantly',
  'precisely',
  'quickly',
  'sadly',
  'humbly',
  'proudly',
  'shockingly',
  'calmly',
  'passionately'
]
const preposition = [
  'down',
  'into',
  'up',
  'on',
  'upon',
  'below',
  'above',
  'through',
  'across',
  'towards'
]

export const users = [
  'Brayden',
  'Bob',
  'Bovington',
  'Requis',
  'Dequavis',
  'Deshawn',
  'Treyvon',
  'Tyrone',
  'Jamal',
  'Demetrius'
]

export const randGen = () => {
  return Math.floor(Math.random() * 10)
}

export const generateText = () => {
  const rand1 = randGen()
  const rand2 = randGen()
  const rand3 = randGen()
  const rand4 = randGen()
  const rand5 = randGen()
  const rand6 = randGen()
  //                var randCol = [rand1,rand2,rand3,rand4,rand5];
  //                var i = randGen();
  return (
    'The ' +
    adjectives[rand1] +
    ' ' +
    nouns[rand2] +
    ' ' +
    adverbs[rand3] +
    ' ' +
    verbs[rand4] +
    ' because some ' +
    nouns[rand1] +
    ' ' +
    adverbs[rand1] +
    ' ' +
    verbs[rand1] +
    ' ' +
    preposition[rand1] +
    ' a ' +
    adjectives[rand2] +
    ' ' +
    nouns[rand5] +
    ' which, became a ' +
    adjectives[rand3] +
    ', ' +
    adjectives[rand4] +
    ' ' +
    nouns[rand6] +
    '.'
  )
}
