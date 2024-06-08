import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faArrowDown, faArrowUp, faDownload, faRightLeft, faRotateRight, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import Modal from 'react-modal'
import { Rnd } from 'react-rnd'
import Button from '@/components/Button'
import FAIcon from '@/components/FAIcon'
import Image from '@/components/Image'
import { configMemeMaker, configPageText, configSocials } from '@/lib/constants/configurables'
import { Collection, Image as ImageT } from '@/lib/types'
import { getCollection } from '@/services/collection'
import { getAvailableImageUrl, getImage, getImagesAllByCollectionId } from '@/services/image'
import styles from '@/styles/MemeMaker.module.css'

type InsertedImage = {
  id: number
  src: string
  width: number
  height: number
  focus: boolean
  flipX: boolean
  rotation: number
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const { query } = context

  let initialInsertableImages: ImageT[] = []
  let initialCollection: Collection | null = null

  try {
    const data = await getCollection('meme-maker', true)
    if (data) {
      initialCollection = data
    }
  } catch (error: any) {
    //
  }

  if (initialCollection) {
    const data = await getImagesAllByCollectionId({ collection_id: initialCollection.id })
    initialInsertableImages = data?.[0] || []
  }

  const overlayImages = initialInsertableImages?.map((image) => getAvailableImageUrl('no-border', image)) || []

  const imageIdOrSlug = query.id as string
  let initialImage: ImageT | null = null
  initialImage = await getImage(imageIdOrSlug || configMemeMaker.defaultImageId)

  return {
    props: {
      initialImage,
      overlayImages
    }
  }
})

type Props = {
  initialImage: ImageT | null
  overlayImages: string[]
}

export default function MemeMaker({ initialImage, overlayImages }: Props) {
  const [mainImage, setMainImage] = useState<ImageT | null>(initialImage)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectImageModalOpen, setSelectImageModalOpen] = useState(false)
  const [insertedImages, setInsertedImages] = useState<InsertedImage[]>([])
  const [isRotating, setIsRotating] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotatingImageIndex, setRotatingImageIndex] = useState(-1)
  const [imagedFinishedLoading, setImagedFinishedLoading] = useState<boolean>(false)
  const [imageIdOrSlug, setImageIdOrSlug] = useState<string | number>(mainImage?.slug || mainImage?.id || '')
  const router = useRouter()
  
  const mainImageUrl = getAvailableImageUrl('no-border', mainImage)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      const { pathname } = router
      router.push(pathname)
      setImageIdOrSlug('')
      setSelectImageModalOpen(false)
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleShowChangeImageModal = (bool: boolean) => {
    setSelectImageModalOpen(bool)
  }

  const handleImageIdOrSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageIdOrSlug(event.target.value)
  }

  const handleImageIdOrSlugBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      try {
        const image = await getImage(event.target.value)
        setMainImage(image)
      } catch (error) {
        console.log('handleImageIdOrSlugBlur error', error)
      }
    }
  }

  function handleImageFinishedLoading(event: any) {
    setImagedFinishedLoading(true)
  }

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

  const handleRotateMouseDown = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, index: number) => {
    setIsRotating(true)
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    setStartX(clientX)
    setRotatingImageIndex(index)
  }

  const handleRotateMouseMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isRotating || rotatingImageIndex === -1) return
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const dx = clientX - startX
    const adjustedAngle = dx * 4
    setStartX(clientX)
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
        link.download = 'daumen.png'
        link.click()
      })
  }

  const metaTitle = configPageText.memeMaker.metaTitle
  const metaDescription = configPageText.memeMaker.metaDescription
  const metaImageUrl = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/logo-preview.png`

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={configSocials.twitterHandle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImageUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImageUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <div className='container-fluid main-content-column overflow-y-scroll'>
        <div className='main-content-inner-wrapper'>
          <div className='container-fluid'>
            <h1 className={styles['header-text']}>{configMemeMaker.name}</h1>
            <div className={styles['change-image-wrapper']}>
              <Button
                className='btn btn-primary'
                onClick={() => handleShowChangeImageModal(true)}>
                {/* eslint-disable-next-line quotes */}
                {`Select Image `}
                <FAIcon
                  className=''
                  icon={faImage}
                />
              </Button>
            </div>
            <Modal
              contentLabel="Image Selectors Modal"
              isOpen={selectImageModalOpen}
              onRequestClose={() => handleShowChangeImageModal(false)}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                content: {
                  backgroundColor: 'white',
                  inset: 0,
                  padding: '4px 32px 8px 32px',
                  position: 'relative'
                }
              }}
            >
              <div className={styles['image-selectors']}>
                <label htmlFor="name" className="form-label">Image Id</label>
                <input
                  className={`form-control ${styles['image-id-input']}`}
                  id="image-id"
                  onBlur={(e) => handleImageIdOrSlugBlur(e)}
                  onChange={(e) => handleImageIdOrSlugChange(e)}
                  type="text"
                  value={imageIdOrSlug}
                />
                <div className={styles['image-selectors-or']}>OR</div>
                <Button
                  className='btn btn-success'
                  onClick={handleUploadButtonClick}>
                  {/* eslint-disable-next-line quotes */}
                  {`Upload Image `}
                  <FAIcon
                    className=''
                    icon={faUpload}
                  />
                </Button>
              </div>
            </Modal>
            <div className={styles['main-image-wrapper']}>
              <Image
                alt='Main image'
                className={`${styles['main-image']}`}
                draggable={false}
                imageSrc={uploadedImage || mainImageUrl}
                onLoad={handleImageFinishedLoading}
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
                  onClick={() => handleFocus(index)}
                  onTouchStart={() => handleFocus(index)}
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
                    draggable={false}
                    imageSrc={image.src}
                    stretchFill
                    style={{
                      transform: `rotate(${image.rotation}deg) scaleX(${image.flipX ? '-1' : '1'})`,
                      outline: image.focus ? '3px solid rgba(13, 110, 253, 0.5)' : 'none'
                    }}
                    title='Inserted image'
                  />
                  {image.focus && (
                    <div
                      className={`${styles['rotate-bar']} rotate-bar`}
                      onMouseDown={(event) => handleRotateMouseDown(event, index)}
                      onMouseMove={handleRotateMouseMove}
                      onMouseUp={handleRotateMouseUp}
                      onMouseLeave={handleRotateMouseUp}
                      onTouchStart={(event) => handleRotateMouseDown(event, index)}
                      onTouchMove={handleRotateMouseMove}
                      onTouchEnd={handleRotateMouseUp}
                    >
                      <div className={styles['rotate-indicator']} />
                    </div>
                  )}
                </Rnd>
              ))}
            </div>
            {imagedFinishedLoading && (
              <>
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
                <div className={styles['bottom-buttons']}>
                  <Button
                    className='btn btn-success'
                    onClick={handleDownload}>
                    {/* eslint-disable-next-line quotes */}
                    {`Download `}
                    <FAIcon
                      className=''
                      icon={faDownload}
                    />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </>
  )
}