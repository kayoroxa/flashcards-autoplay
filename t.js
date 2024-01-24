const fs = require('fs')

const has = [
  // '\\bas .* as\\b',
  // '\\bthe most\\b',
  '\\bthe most\\b',
  've never',
  // '^it',
  'just',
  // 'not .* but',
  'How come',
  // "(?<!is|are|be|'s|'re|was|were|'m|am) \\w+[^h]ing",
  // '\\bthan\\b',
  // '\\w+full',
  // '\\w+lier',
  // '\\bthe least\\b',
  // '\\w+iest\\b',
  // '\\?',
  // 'had better',
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
    4000
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
  if (sentence.length > 40 || sentence.length < 30 || sentence.includes('Tom'))
    return false
  if (!sentence.includes('?')) return false
  if (has.length && !has.some(m => sentence.match(new RegExp(m, 'gi'))))
    return false

  const words = sentence.toLowerCase().match(/[a-zA-Z][’'a-zA-Z]*/gi)

  return words.every(
    w =>
      wordsMostUsed.includes(w) ||
      regexWords?.some(m => w.match(new RegExp(m, 'gi')))
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

console.log(oi.slice(0, 300).join('\n'))
