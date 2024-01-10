import rawSentences from './sentences.js'

function breakSentences(sentences) {
  return sentences

    .map(([eng, pt]) => {
      //remove pessoa 1:
      eng = eng.replace(/.*?\d+:\s/gi, '')
      pt = pt.replace(/.*?\d+:\s/gi, '')

      if (eng.length > 40 && !eng.includes('|')) {
        return [eng.split(/[|.,!]/g), pt.split(/[|.,!]/g)]
      }
      return [eng.split(/[|]/g), pt.split(/[|]/g)]
    })
    .reduce((prev, cur) => {
      const [eng1and2, pt1and2] = cur
      const asd = eng1and2
        .map((_, i) => [eng1and2[i]?.trim(), pt1and2[i]?.trim()])
        .filter(v => v[0].length > 0 && v[1].length > 0)

      return [
        //
        ...prev,
        ...asd,
      ]
    }, [])
}

export function getSentences(rawSentences) {
  let sentences = rawSentences
    .replace(/[,.]/g, '')
    .trim()
    .split('\n\n')
    .filter(Boolean)
    .map(v => v.split('\n').filter(Boolean))

  sentences = breakSentences(sentences)
  return sentences
}

export default getSentences(rawSentences)
