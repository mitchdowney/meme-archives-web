export async function copyImageToClipboard(image: HTMLImageElement) {
  try {
    if (navigator.clipboard && navigator.clipboard.write) {
      const copyableBlobPromise = createCopyableBlobPromise(image)
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': copyableBlobPromise })])
    }
  } catch (error) {
    console.error(error)
  }
}

async function createCopyableBlobPromise(image: HTMLImageElement) {
  return new Promise((resolve, reject)=>{
    try {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx)
        return reject('Error loading image')
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
      canvas.toBlob(e=>e ? resolve(e) : reject('Error converting image to blob'), 'image/png')
    } catch (e) {
      return reject(e)
    }
  })
}