export default function TTS() {
  return new Promise(resolve => {
    const synth = window.speechSynthesis
    let voices = []

    function speak(sentence = 'oi tudo bom?', lang = 'brasil', rate = 1) {
      return new Promise(resolve => {
        const utterThis = new SpeechSynthesisUtterance(sentence)
        utterThis.voice = voices.find(v =>
          v.voiceURI.toLowerCase().includes(lang)
        )
        utterThis.rate = rate
        console.log(voices)
        synth.speak(utterThis)
        utterThis.onend = () => {
          resolve()
        }
      })
    }

    const stop = () => synth.cancel()

    const wait = time =>
      new Promise(resolve => setTimeout(() => resolve(), time))

    setTimeout(() => {
      voices = synth.getVoices()
      resolve({
        speak,
        wait,
        stop,
      })
    }, 300)
  })
}
