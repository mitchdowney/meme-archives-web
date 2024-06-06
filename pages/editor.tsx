import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import Image from '@/components/Image'
import styles from '@/styles/Editor.module.css'
import FAIcon from '@/components/FAIcon'
import { faArrowDown, faArrowUp, faRightLeft, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons'

type InsertedImage = {
  id: number
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
  const [isRotating, setIsRotating] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotatingImageIndex, setRotatingImageIndex] = useState(-1)

  const handleImageClick = (img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const width = Math.min(120, img.naturalWidth)
    const height = width / aspectRatio
    setInsertedImages([...insertedImages, {
      id: Math.floor(Math.random() * 1000000) + 1,
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
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, rotation: Math.round((img.rotation + 45) / 90) * 90 % 360 } : img))
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

  // Define event handlers for the rotate-bar
  const handleRotateMouseDown = (event: React.MouseEvent, index: number) => {
    setIsRotating(true)
    setStartX(event.clientX)
    setRotatingImageIndex(index)
  }

  const handleRotateMouseMove = (event: React.MouseEvent) => {
    if (!isRotating || rotatingImageIndex === -1) return
    const dx = event.clientX - startX    
    const adjustedAngle = dx * 4
    setStartX(event.clientX) // Update startX for the next mouse move event
    setInsertedImages(insertedImages.map((img, i) => i === rotatingImageIndex ? { ...img, rotation: img.rotation + adjustedAngle } : img))
  }

  const handleRotateMouseUp = () => {
    setIsRotating(false)
    setRotatingImageIndex(-1)
  }

  const onResize = (index: number, newWidth: number, newHeight: number) => {
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, width: newWidth, height: newHeight } : img))
  }

  const handleSendBackOneLevelClick = (index: number) => {
    if (index > 0) {
      const newImages = [...insertedImages]
      const temp = newImages[index]
      newImages[index] = newImages[index - 1]
      newImages[index - 1] = temp
      setInsertedImages(newImages)
    }
  }

  const handlePullForwardOneLevelClick = (index: number) => {
    if (index < insertedImages.length - 1) {
      const newImages = [...insertedImages]
      const temp = newImages[index]
      newImages[index] = newImages[index + 1]
      newImages[index + 1] = temp
      setInsertedImages(newImages)
    }
  }

  const handleRemoveImage = (index: number) => {
    setInsertedImages(insertedImages.filter((_, i) => i !== index))
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
                key={image.id}
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
                cancel='.rotate-bar'
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
                      title='Flip horizontally'
                    />
                    <FAIcon
                      activeColor='#333'
                      buttonWrapperName={styles['inserted-image-button-wrapper']}
                      buttonClassName={styles['inserted-image-button']}
                      className={styles['inserted-image-button']}
                      color='#777'
                      icon={faArrowUp}
                      onClick={(event) => {
                        handleSendBackOneLevelClick(index)
                      }}
                      title='Send back one level'
                    />
                    <FAIcon
                      activeColor='#333'
                      buttonWrapperName={styles['inserted-image-button-wrapper']}
                      buttonClassName={styles['inserted-image-button']}
                      className={styles['inserted-image-button']}
                      color='#777'
                      icon={faArrowDown}
                      onClick={(event) => {
                        handlePullForwardOneLevelClick(index)
                      }}
                      title='Pull forward one level'
                    />
                    <FAIcon
                      activeColor='#333'
                      buttonWrapperName={styles['inserted-image-button-wrapper']}
                      buttonClassName={styles['inserted-image-button']}
                      className={styles['inserted-image-button']}
                      color='#777'
                      icon={faTrash}
                      onClick={() => handleRemoveImage(index)}
                      title='Remove image'
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
                {image.focus && (
                  <div
                    className={`${styles['rotate-bar']} rotate-bar`}
                    onMouseDown={(event) => handleRotateMouseDown(event, index)}
                    onMouseMove={handleRotateMouseMove}
                    onMouseUp={handleRotateMouseUp}
                    onMouseLeave={handleRotateMouseUp}
                  >
                    <div className={styles['rotate-indicator']} />
                  </div>
                )}
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