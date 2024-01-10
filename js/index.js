import { getSentences } from './getSentences.js'
import TimeLine from './timeline.js'
import TTS from './tts.js'

// import sentences from './getSentences.js'

// .filter(v => v[0]?.length && v[1])

function getMySentences() {
  const textArea = document.querySelector('#sentences')
  sentences = getSentences(textArea.value)
  return sentences
}

let sentences

async function app() {
  const timeLine = TimeLine({
    max: sentences.length,
  })

  const tts = await TTS()
  const local = localStorage.getItem('index-sentence')
  let canPlay = true

  let index = 0 //Number(local ? Number(local) : 0)

  async function play() {
    sentences = getMySentences()

    const [eng, pt] = sentences[index]
    // const [eng, pt] = sentences[index]
    console.log({ eng, pt })
    if (pt.includes('--') || eng.includes('--')) {
      await new Promise(r => setTimeout(r, 13000))
      index++
      timeLine.setIndex(index)
      play()
      return
    }
    console.log({ sentence: sentences[index][0], index })
    const characterPerSecond = 10
    await tts.speak(pt, 'brasil', 1.2)
    const secToSpeakSentence =
      eng.replace(/\s+/g, '').length / characterPerSecond
    await tts.wait(1000 * secToSpeakSentence)
    if (!canPlay) return
    await tts.speak(eng, 'us')
    await tts.wait(10)
    index++
    timeLine.setIndex(index)
    play()
  }

  let togglePlay = true

  const playButton = document.querySelector('#play')

  playButton.onclick = () => {
    if (!togglePlay) {
      tts.stop()
      canPlay = false
    } else {
      canPlay = true
      play()
    }

    togglePlay = !togglePlay
    if (!togglePlay) playButton.textContent = 'pause'
    else playButton.textContent = 'Play'
  }

  timeLine.onChange(newIndex => {
    index = newIndex
    tts.stop()
  })
}

//onkeydown
const textareaInput = document.querySelector('#sentences')
textareaInput.addEventListener('input', () => {
  sentences = textareaInput.value
  app()
})
