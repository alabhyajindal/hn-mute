function main(muted_words) {
  const pagespace = document.querySelector('#bigbox')
  // The next element after pagespace is a table row
  const tableRow = pagespace.firstChild.firstChild
  const submissions = Array.from(tableRow.querySelectorAll('.titleline > a'))
  const tableBody = tableRow.querySelector('tbody')

  // A spacer is present after every submission
  const spacerElem = document.querySelector('.spacer')

  // Last two elements in the table body are responsible for the "More" link that goes to the next page
  const morespace = tableBody.children[tableBody.children.length - 2]
  const more = tableBody.children[tableBody.children.length - 1]

  // Create a new table body that will eventually replace the original
  const newTableBody = document.createElement('tbody')
  // Variable used to specify the rank in submissions
  let count = 0

  submissions.forEach((submission) => {
    // Case insensitive matching
    const title = submission.innerText.toLowerCase()
    // true if the submission contains a word that's muted
    const wordInSubmission = muted_words.some((word) => {
      const re = new RegExp(`\\b${word}\\b`)
      return title.match(re)
    })

    // ok submissions, ie, the title doesn't contain a muted word
    if (!wordInSubmission) {
      // Element with the upvote button, title and url
      const titleParent = submission.closest('tr')

      // Element with the points, time and other details
      const descParent = titleParent.nextElementSibling

      // Updating the rank so the final list are in order
      const rank = titleParent.querySelector('.rank')
      rank.innerText = ++count

      // Appending to the new table body
      newTableBody.appendChild(titleParent)
      newTableBody.appendChild(descParent)
      // spacerElem is cloned because we want a new element to be added on each iteration
      newTableBody.appendChild(spacerElem.cloneNode(false))
    }
  })

  // Add valid submissions are added to the new table body at this point

  // Adding the elements that create the "More" link
  newTableBody.appendChild(morespace)
  newTableBody.appendChild(more)

  // Finally replacing the current table children with the new table
  tableBody.replaceChildren(newTableBody)
}

// Get the person's preference from storage
const getOptions = browser.storage.sync.get('words')

async function init() {
  try {
    const options = await browser.storage.sync.get('words')
    const muted_words =
      options.words
        ?.split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => line.trim()) || []
    main(muted_words)
  } catch (err) {
    console.error(err)
  }
}

init()
