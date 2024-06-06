import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import Image from '@/components/Image'
import styles from '@/styles/Editor.module.css'
import FAIcon from '@/components/FAIcon'
import { faRightLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'

type InsertedImage = {
  src: string
  width: number
  height: number
  focus: boolean
  flipX: boolean
  rotation: number
}

export default function Editor() {
  const mainImage = 'https://d13jp9qoi0cn61.cloudfront.net/78.png'
  const overlayImages = ['https://d13jp9qoi0cn61.cloudfront.net/79.png']
  const [insertedImages, setInsertedImages] = useState<InsertedImage[]>([])

  const handleImageClick = (img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const width = Math.min(120, img.naturalWidth)
    const height = width / aspectRatio
    setInsertedImages([...insertedImages, {
      src: img.src,
      width,
      height,
      focus: false,
      flipX: false,
      rotation: 0
    }])
  }

  const handleRotateClick = (event: any, index: number) => {
    event.stopPropagation()
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, rotation: (img.rotation + 90) % 360 } : img))
  }

  const handleFlipXClick = (event: any, index: number) => {
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, flipX: !img.flipX } : img))
  }

  const handleFocus = (index: number) => {
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, focus: true } : img))
  }
  
  const handleBlur = (event: any, index: number) => {
    if (!event?.relatedTarget?.className?.includes(styles['inserted-image-button'])) {
      setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, focus: false } : img))
    }
  }

  const onResize = (index: number, newWidth: number, newHeight: number) => {
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, width: newWidth, height: newHeight } : img))
  }

  const handleDownload = () => {
    const input = document.querySelector(`.${styles['main-image-wrapper']}`)
    html2canvas(input as any, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = imgData
        link.download = 'combined-image.png'
        link.click()
      })
  }

  const getInsertedImageClassNames = (image: InsertedImage) => {
    const classNames = []
    if (image.flipX) {
      classNames.push('flip-horizontal')
    }
    return classNames.join(' ')
  }

  return (
    <div className='container-fluid main-content-column overflow-y-scroll'>
      <div className='main-content-inner-wrapper'>
        <div className='container-fluid'>
          <div className={styles['main-image-wrapper']}>
            <Image
              alt='Main image'
              className={`${styles['main-image']}`}
              draggable={false}
              imageSrc={mainImage}
              priority
              stretchFill
              title='Main image'
            />
            {insertedImages.map((image, index) => (
              <Rnd
                key={index}
                size={{ width: image.width, height: image.height }}
                onResize={(e, direction, ref, delta, position) => {
                  onResize(index, ref.offsetWidth, ref.offsetHeight)
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                lockAspectRatio
                bounds='parent'
                onFocus={() => handleFocus(index)}
                onBlur={(event: any) => handleBlur(event, index)}
                tabIndex={0}
              >
                {image.focus && (
                  <div className={styles['inserted-image-buttons']}>
                    <FAIcon
                      activeColor='#333'
                      buttonWrapperName={styles['inserted-image-button-wrapper']}
                      buttonClassName={styles['inserted-image-button']}
                      className={styles['inserted-image-button']}
                      color='#777'
                      icon={faRotateRight}
                      onClick={(event) => {
                        handleRotateClick(event, index)
                      }}
                      title='Rotate right'
                    />
                    <FAIcon
                      activeColor='#333'
                      buttonWrapperName={styles['inserted-image-button-wrapper']}
                      buttonClassName={styles['inserted-image-button']}
                      className={styles['inserted-image-button']}
                      color='#777'
                      icon={faRightLeft}
                      onClick={(event) => {
                        handleFlipXClick(event, index)
                      }}
                      title='Rotate right'
                    />
                  </div>
                )}
                <Image
                  alt='Inserted image'
                  className={getInsertedImageClassNames(image)}
                  draggable={false}
                  imageSrc={image.src}
                  stretchFill
                  style={{ transform: `rotate(${image.rotation}deg) scaleX(${image.flipX ? '-1' : '1'})` }}
                  title='Inserted image'
                />
              </Rnd>
            ))}
          </div>
          <div className={styles['insertable-images']}>
            {overlayImages.map((src, index) => (
              <Image
                alt='Insertable image'
                className={`${styles['insertable-image']}`}
                key={index}
                imageSrc={src}
                onClick={(e) => handleImageClick(e.target as HTMLImageElement)}
                stretchFill
                title='Insertable image'
              />
            ))}
          </div>
          <button onClick={handleDownload}>Download Image</button>
        </div>
      </div>
    </div>
  )
}