import React, { CSSProperties, Ref, MouseEventHandler } from 'react'

interface Props {
  autoplay?: boolean
  className?: string
  height?: number
  loop?: boolean
  videoSrc: string
  innerRef?: Ref<HTMLVideoElement>
  onClick?: MouseEventHandler<HTMLVideoElement>
  onLoadedData?: () => void
  stretchFill?: boolean
  title: string
  width?: number
}

export default function Video({ autoplay, className, height = 0, loop, videoSrc,
  innerRef, onClick, onLoadedData, stretchFill, title, width = 0 }: Props) {

  const style: CSSProperties = {}
  if (stretchFill) {
    style.width = '100%'
    style.height = 'auto'
  }

  // muted must be true for autoplay to work on some browsers
  const muted = autoplay
  
  return (
    <video
      autoPlay={autoplay}
      className={className}
      height={height}
      loop={loop}
      muted={muted}
      onClick={onClick}
      onLoadedData={onLoadedData}
      ref={innerRef}
      src={videoSrc}
      title={title}
      style={style}
      width={width}
      controls
    />
  )
}
