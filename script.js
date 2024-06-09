function main(muted_words) {
  const pagespace = document.querySelector('#pagespace')
  const tableRow = pagespace.nextElementSibling
  const submissions = Array.from(tableRow.querySelectorAll('.titleline > a'))
  console.log(submissions)
  const tableBody = tableRow.querySelector('tbody')

  const spacerElem = document.querySelector('.spacer')
  const morespace = tableBody.children[tableBody.children.length - 2]
  const more = tableBody.children[tableBody.children.length - 1]

  const newTableBody = document.createElement('tbody')
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

      newTableBody.appendChild(titleParent.cloneNode(true))
      newTableBody.appendChild(descParent.cloneNode(true))
      newTableBody.appendChild(spacerElem.cloneNode(true))
    }
  })

  newTableBody.appendChild(morespace)
  newTableBody.appendChild(more)
  tableBody.replaceChildren(newTableBody)
}

const getOptions = browser.storage.sync.get('words')

getOptions.then(
  (options) => {
    const muted_words = options.words?.split('\n') || []
    main(muted_words)
  },
  (err) => console.error(err)
)
