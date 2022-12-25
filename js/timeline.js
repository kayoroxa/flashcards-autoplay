export default function timeLine({ max }) {
  const timeLineElem = document.querySelector('#timeline')
  const indexSentenceELem = document.querySelector('#index-sentence')

  timeLineElem.max = max
  const local = localStorage.getItem('index-sentence')
  if (local) {
    timeLineElem.value = Number(local)
    indexSentenceELem.textContent = Number(local)
  } else {
    timeLineElem.value = 0
    indexSentenceELem.textContent = 0
  }

  function onChange(callBack) {
    timeLineElem.addEventListener('change', ({ target }) => {
      callBack(target.value, target)
    })
  }

  function setIndex(index) {
    timeLineElem.value = index
    indexSentenceELem.textContent = index
    localStorage.setItem('index-sentence', index)
  }

  return {
    onChange,
    setIndex,
  }
}
