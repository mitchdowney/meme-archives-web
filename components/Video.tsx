import React, { CSSProperties, Ref, MouseEventHandler } from 'react'

interface Props {
  className?: string
  height?: number
  videoSrc: string
  innerRef?: Ref<HTMLVideoElement>
  onClick?: MouseEventHandler<HTMLVideoElement>
  onLoadedData?: () => void
  stretchFill?: boolean
  title: string
  width?: number
}

export default function Video({ className, height = 0, videoSrc, innerRef,
  onClick, onLoadedData, stretchFill, title, width = 0 }: Props) {

  const style: CSSProperties = {}
  if (stretchFill) {
    style.width = '100%'
    style.height = 'auto'
  }
  
  return (
    <video
      className={className}
      height={height}
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
