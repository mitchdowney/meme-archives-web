export async function copyImageToClipboard(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    const data = await response.blob()
    const blob = new Blob([data], { type: 'image/png' })
    const item = new ClipboardItem({ 'image/png': blob })

    if (navigator.clipboard && navigator.clipboard.write) {
      // Use Clipboard API if it's available
      await navigator.clipboard.write([item])
    } else if (document.execCommand) {
      // Fallback to document.execCommand('copy') for iOS Safari
      const canvas = document.createElement('canvas')
      const img = document.createElement('img')
      img.src = URL.createObjectURL(blob)
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL()
        const input = document.createElement('input')
        input.value = dataUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
    }
  } catch (error) {
    console.error(error)
  }
}