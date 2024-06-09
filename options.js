function saveOptions(e) {
  e.preventDefault()
  browser.storage.sync.set({
    words: document.querySelector('.words').value,
  })
  notice.classList.remove('hidden')
  setTimeout(() => {
    notice.classList.add('hidden')
  }, 1200)
}

async function restoreOptions() {
  try {
    const options = await browser.storage.sync.get('words')
    const lines = options.words
      ?.split('\n')
      .filter((line) => line.trim() !== '')
    const words = lines.join('\n')
    document.querySelector('.words').value = words || ''
  } catch (err) {
    console.error(err)
  }
}

const notice = document.querySelector('.notice')
document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
