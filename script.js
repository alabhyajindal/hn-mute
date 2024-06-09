const SUBMISSIONS = Array.from(document.querySelectorAll('.titleline > a'))
let MUTED_WORDS

function removeVideo(video) {
  const videoChannelUrl = video.querySelector('.ytd-channel-name > a').href
  const videoChannelId = videoChannelUrl.slice(videoChannelUrl.indexOf('@'))
  console.log(MUTED_WORDS)
  if (MUTED_WORDS.includes(videoChannelId)) {
    video.classList.add('muted-channel')
  } else {
    video.classList.remove('muted-channel')
  }
}

function updateUI() {
  const videos = document.querySelectorAll('ytd-video-renderer')
  videos.forEach((video) => {
    removeVideo(video)
  })
}

function onSearchPage() {
  const url = new URL(window.location)
  if (url.pathname.includes('/results')) {
    return true
  }
}

function main() {
  const pagespace = document.querySelector('#pagespace')
  let tableRow = pagespace.nextElementSibling

  const spacerElem = document.createElement('tr')
  spacerElem.classList.add('spacer')
  spacerElem.style.height = '5px'

  const ok_submissions = SUBMISSIONS.map((submission) => {
    const title = submission.innerHTML.toLowerCase()
    const wordInSubmission = MUTED_WORDS.some((word) => {
      const re = new RegExp(`\\b${word}\\b`)
      return title.match(re)
    })

    const titleParent = submission.closest('tr')
    const descParent = titleParent.nextElementSibling

    return { item: { titleParent, descParent }, ok: !wordInSubmission }
  }).filter((s) => s.ok)

  tableRow.innerHTML = ''

  ok_submissions.forEach((submission, i) => {
    let { titleParent, descParent } = submission.item
    const rank = titleParent.querySelector('.rank')
    rank.innerHTML = i + 1

    tableRow.appendChild(titleParent)
    tableRow.appendChild(descParent)
    tableRow.appendChild(spacerElem)
  })
}

const getOptions = browser.storage.sync.get('words')

getOptions.then(
  (options) => {
    if (options) {
      MUTED_WORDS = options.words?.split('\n') || []
    }
    main()
  },
  (err) => console.error(err)
)
