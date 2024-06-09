function main(muted_words) {
  const submissions = Array.from(document.querySelectorAll('.titleline > a'))
  const tableRow = document.querySelector('#pagespace').nextElementSibling
  const spacerElem = document.querySelector('.spacer')

  tableRow.innerHTML = ''
  let count = 0

  submissions.forEach((submission) => {
    const title = submission.innerHTML.toLowerCase()
    const wordInSubmission = muted_words.some((word) => {
      const re = new RegExp(`\\b${word}\\b`)
      return title.match(re)
    })

    if (!wordInSubmission) {
      const titleParent = submission.closest('tr')
      const descParent = titleParent.nextElementSibling
      const rank = titleParent.querySelector('.rank')
      rank.innerHTML = ++count

      tableRow.appendChild(titleParent)
      tableRow.appendChild(descParent)
      tableRow.appendChild(spacerElem)
    }
  })
}

const getOptions = browser.storage.sync.get('words')

getOptions.then(
  (options) => {
    const muted_words = options.words?.split('\n') || []
    main(muted_words)
  },
  (err) => console.error(err)
)
