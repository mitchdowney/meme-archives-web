import NextImage from 'next/image'
import { CSSProperties, MouseEventHandler, ReactEventHandler, TouchEventHandler } from 'react'

type Props = {
  alt: string
  className?: string
  draggable?: boolean
  height?: number
  imageSrc: string
  innerRef?: any
  onClick?: MouseEventHandler<HTMLImageElement>
  onLoad?: ReactEventHandler<HTMLImageElement>
  onTouchStart?: TouchEventHandler<HTMLImageElement>
  priority?: boolean
  stretchFill?: boolean
  style?: CSSProperties
  title: string
  width?: number
}

export default function Image({ alt, className, draggable = true, height = 0, imageSrc,
  innerRef, onClick, onLoad, onTouchStart, priority, stretchFill,
  style = {}, title, width = 0 }: Props) {

  if (stretchFill) {
    style.width = '100%'
    style.height = 'auto'
  }
  
  return (
    <NextImage
      alt={alt}
      className={className}
      draggable={draggable}
      height={height}
      onClick={onClick}
      onLoad={onLoad}
      onTouchStart={onTouchStart}
      priority={priority}
      ref={innerRef}
      src={imageSrc}
      title={title}
      unoptimized
      style={style}
      width={width}
      // crossOrigin must be set to anonymous to work with canvas.toBlob
      // aka copyImageToClipboard in lib/clipboard.ts
      crossOrigin='anonymous'
    />
  )
}
