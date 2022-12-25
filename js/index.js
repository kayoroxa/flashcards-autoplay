import rawSentences from './sentences.js'
import TimeLine from './timeline.js'
import TTS from './tts.js'

const sentences = rawSentences
  .split('\n\n')
  .filter(Boolean)
  .map(v => v.split('\n').filter(Boolean))

const timeLine = TimeLine({
  max: sentences.length,
})

async function app() {
  const tts = await TTS()
  const local = localStorage.getItem('index-sentence')
  let canPlay = true

  let index = local ? Number(local) : 0

  async function play() {
    const [eng, pt] = sentences[index]
    console.log({ sentence: sentences[index][0], index })
    await tts.speak(pt, 'brasil')
    await tts.wait(1000)
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

app()
