import rawSentences from './sentences.js'
import TTS from './tts.js'

const sentences = rawSentences
  .split('\n\n')
  .filter(Boolean)
  .map(v => v.split('\n').filter(Boolean))

async function app() {
  const tts = await TTS()

  for (let [eng, pt] of sentences) {
    await tts.speak(pt, 'brasil')
    await tts.wait(1000)
    await tts.speak(eng, 'us')
  }
}

app()
