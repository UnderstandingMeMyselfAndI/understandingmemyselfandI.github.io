const downloadImage = (url, name = 'newImage') => {
  return fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      return Promise.resolve()
    })
}

const download = () => {
  downloadImage('https://picsum.photos/536/354', 'newFileName')
    .then(() => console.log('ok'))
    .catch(() => console.log('error'))
}

export { download }
