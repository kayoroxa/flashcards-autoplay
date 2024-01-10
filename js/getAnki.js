import sentences from './getSentences.js'

const sentencesAnki = sentences
  .map(([eng, pt]) => {
    return `${pt},${eng}`
  })
  .join('\n')

window.anki = sentencesAnki
