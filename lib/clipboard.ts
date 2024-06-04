export async function copyImageToClipboard(image: HTMLImageElement) {
  try {
    if (navigator.clipboard && navigator.clipboard.write) {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ])
          }
        }, 'image/png')
      }
    }
  } catch (error) {
    console.error(error)
  }
}
