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
  const muted_submissions = SUBMISSIONS.forEach((submission) => {
    const title = submission.innerHTML.toLowerCase()
    const wordInSubmission = MUTED_WORDS.some((word) => {
      const re = new RegExp(`\\b${word}\\b`)
      return title.match(re)
    })

    if (wordInSubmission) {
      // submission.innerHTML = ''
      const titleParent = submission.closest('tr')
      const descParent = titleParent.nextElementSibling
      const spacer = titleParent.previousElementSibling

      console.log(spacer)
      console.log(titleParent)
      console.log(descParent)

      // titleParent.remove()
      // descParent.remove()
    }
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
