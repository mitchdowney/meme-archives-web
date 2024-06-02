export const checkIfiOSWebBrowser = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const checkIfDesktopBrowser = () => {
  return !(/Mobi|Android/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent))
}
