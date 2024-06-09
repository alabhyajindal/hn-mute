function saveOptions(e) {
  e.preventDefault()
  browser.storage.sync.set({
    words: document.querySelector('#words').value,
  })
  console.log(document.querySelector('#words'))
  notice.innerHTML = '<p>Updated, refresh existing Hacker News tabs</p>'
  setTimeout(() => {
    notice.innerHTML = ''
  }, 1000)
}

function restoreOptions() {
  let getting = browser.storage.sync.get('words')
  getting.then(
    (options) => {
      document.querySelector('#words').value = options.words || ''
    },
    (err) => console.error(err)
  )
}

const notice = document.querySelector('#notice')
document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
