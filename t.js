const fs = require('fs')

const has = [
  // '\\bas .* as\\b',
  // '\\bthe most\\b',
  // '\\bthan\\b',
  // '\\w+full',
  // '\\w+lier',
  // '\\bthe least\\b',
  // '\\w+iest\\b',
]

let sentences = fs
  .readFileSync(
    'C:/Users/Caio/OneDrive/SYNC - INGLÊS FLIX/890k sentences in english.txt',
    'utf-8'
  )
  .split('\r\n')

const regexWords = JSON.stringify(has)
  .replace(/\\b/gi, '')
  .match(/((\\w\+)?[a-zA-Z][’'a-zA-Z]*)/gi)

const wordsMostUsed = [
  ...require('C:/Users/Caio/OneDrive/SYNC - INGLÊS FLIX/words most used.json').splice(
    0,
    3000
  ),
]

const replaceRandom = [
  'your father',
  'my friend',
  'my cousin',
  'Mike',
  'John',
  'your boss',
  'my uncle',
]

let oi = sentences.filter(sentence => {
  if (sentence.length > 51 || sentence.length < 35 || sentence.includes('Tom'))
    return false
  if (!has.some(m => sentence.match(new RegExp(m, 'gi')))) return false

  const words = sentence.toLowerCase().match(/[a-zA-Z][’'a-zA-Z]*/gi)

  return words.every(
    w =>
      wordsMostUsed.includes(w) ||
      regexWords.some(m => w.match(new RegExp(m, 'gi')))
  )
})
// .map(sentence => {
//   return sentence.replace(
//     /Tom/gi,
//     replaceRandom[Math.floor(Math.random() * replaceRandom.length)]
//   )
// })

// require('C:/Users/Caio/OneDrive/SYNC - INGLÊS FLIX/sentences_t-2200_c-300_mi-20_ma-40.json').filter(
//   en => has.some(m => en.match(new RegExp(m, 'gi')))
// )

const shuffle = arr => arr.sort(() => Math.random() - 0.5)

oi = shuffle(oi)
// oi = oi.filter(v => v.length > 35)
console.clear()

console.log(oi.slice(0, 100).join('\n'))
