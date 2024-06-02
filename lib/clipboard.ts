export async function copyImageToClipboard(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    const data = await response.blob()
    const blob = new Blob([data], { type: 'image/png' })
    const item = new ClipboardItem({ 'image/png': blob })

    if (navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([item])
    }
  } catch (error) {
    console.error(error)
  }
}