export default function TTS() {
  return new Promise(resolve => {
    const synth = window.speechSynthesis
    let voices = []

    function speak(sentence = 'oi tudo bom?', lang = 'brasil') {
      return new Promise(resolve => {
        const utterThis = new SpeechSynthesisUtterance(sentence)
        utterThis.voice = voices.find(v =>
          v.voiceURI.toLowerCase().includes(lang)
        )
        console.log(voices.find(v => v.voiceURI.toLowerCase().includes(lang)))
        synth.speak(utterThis)
        utterThis.onend = () => {
          resolve()
        }
      })
    }

    const wait = time =>
      new Promise(resolve => setTimeout(() => resolve(), time))

    setTimeout(() => {
      voices = synth.getVoices()
      resolve({
        speak,
        wait,
      })
    }, 300)
  })
}
