import Link from 'next/link'
import Image from '@/components/Image'
import { Image as ImageT } from '@/lib/types'
import { getAvailableImageUrl, getPreferredImagePageUrl } from '@/services/image'
import styles from '@/styles/components/ImageCard.module.css'
import { getTitleOrUntitled } from '@/lib/utility'
import { nonBreakingSpace } from '@/lib/reactHelpers'
import { useState } from 'react'
import Video from './Video'

type Props = {
  hideTags?: boolean
  image: ImageT
}

export default function ImageCard({ hideTags, image }: Props) {
  const { tags } = image
  const title = getTitleOrUntitled(image.title)
  const tagsText = tags?.map?.((tag) => tag?.title).join(', ') || nonBreakingSpace
  const pageUrl = getPreferredImagePageUrl(image)
  const imageSrc = getAvailableImageUrl('no-border', image)

  const cardBodyClass = hideTags ? styles['hide-tags'] : ''

  const [mouseEnter, setMouseEnter] = useState(false)

  const isVideo = !!image?.has_video
  const showVideo = true
  const videoSrc = getAvailableImageUrl('video', image, showVideo)

  const handleMouseEnter = () => {
    setMouseEnter(true)
  }  
  const handleMouseExit = () => {
    setMouseEnter(false)
  }

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.stopPropagation()
  }

  return (
    <Link href={pageUrl} className='remove-text-decoration'>
      <div className={`card ${styles.card}`}>
        <div 
          className='square-wrapper'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseExit}
        >
          <Image
            alt={title}
            className='image-element'
            imageSrc={imageSrc}
            stretchFill
            title={title}
          />
          {
            isVideo && mouseEnter && (
              <Video
                autoplay
                className='image-element'
                controls={false}
                loop
                onClick={handleVideoClick}
                stretchFill
                title={title}
                videoSrc={videoSrc}
              />
            )
          }
        </div>
        <div className={`card-body ${cardBodyClass}`}>
          <h6 className={`card-title ${styles['image-title']}`}>{title}</h6>
          <div className={`card-text ${styles['card-text']}`}>{tagsText}</div>
        </div>
      </div>
    </Link>
  )
}
