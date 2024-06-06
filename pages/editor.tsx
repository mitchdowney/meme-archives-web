import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import Image from '@/components/Image'
import styles from '@/styles/Editor.module.css'

type InsertedImage = {
  src: string
  width: number
  height: number
}

export default function Editor() {
  const mainImage = 'https://d13jp9qoi0cn61.cloudfront.net/78.png'
  const overlayImage = 'https://d13jp9qoi0cn61.cloudfront.net/79.png'
  const [insertedImages, setInsertedImages] = useState<InsertedImage[]>([])

  const handleImageClick = (img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight
    const width = Math.min(120, img.naturalWidth)
    const height = width / aspectRatio
    setInsertedImages([...insertedImages, { src: img.src, width, height }])
  }

  const onResize = (index: number, newWidth: number, newHeight: number) => {
    setInsertedImages(insertedImages.map((img, i) => i === index ? { ...img, width: newWidth, height: newHeight } : img))
  }

  const handleDownload = () => {
    const input = document.querySelector(`.${styles['main-image-wrapper']}`)
    html2canvas(input, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = imgData
        link.download = 'combined-image.png'
        link.click()
      })
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
              >
                <Image
                  alt='Inserted image'
                  className={`${styles['inserted-image']}`}
                  draggable={false}
                  imageSrc={image.src}
                  stretchFill
                  style={{ width: image.width, height: image.height }}
                  title='Inserted image'
                />
              </Rnd>
            ))}
          </div>
          <div className={styles['insertable-images']}>
            <Image
              alt='Insertable image'
              className={`${styles['insertable-image']}`}
              imageSrc={overlayImage}
              onClick={(e) => handleImageClick(e.target as HTMLImageElement)}
              stretchFill
              title='Insertable image'
            />
          </div>
          <button onClick={handleDownload}>Download Image</button>
        </div>
      </div>
    </div>
  )
}