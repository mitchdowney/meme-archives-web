import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import ArtistLink from '@/components/ArtistLink'
import FullImageModal from '@/components/FullImageModal'
import Image from '@/components/Image'
import ImageVersionLinks from '@/components/ImageVersionLinks'
import LoadingSpinner from '@/components/LoadingSpinner'
import TagBadge from '@/components/TagBadge'
import FAIcon from '@/components/FAIcon'
import { getTitleOrUntitled } from '@/lib/utility'
import { BooleanString, Collection, Image as ImageT, Tag, UserInfo } from '@/lib/types'
import { checkIfImageUrlIsAnimation, checkIfImageUrlIsVideo, getAvailableImageUrl, getImage } from '@/services/image'
import styles from '@/styles/ImageIdOrSlug.module.css'
import { checkIfValidInteger } from '@/lib/validation'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { addImageToCollection, getAllCollections } from '@/services/collection'
import { configMemeMaker, configSocials, configText, pageRules } from '@/lib/constants/configurables'
import Video from '@/components/Video'
import Button from '@/components/Button'
import { copyImageToClipboard } from '@/lib/clipboard'
import { faCopy, faImage } from '@fortawesome/free-regular-svg-icons'
import Footer from '@/components/Footer'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

type Props = {
  initialImage: ImageT | null
  userInfo?: UserInfo
}

type ServerSidePropsParams = {
  imageIdOrSlug?: string
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const isServerSideReq = true
  const { params, res } = context
  const { imageIdOrSlug } = params as ServerSidePropsParams
  let initialImage: ImageT | null = null

  if (imageIdOrSlug) {
    try {
      const data = await getImage(imageIdOrSlug, isServerSideReq)
      if (data) {
        initialImage = data
      }
      const isValidInteger = checkIfValidInteger(imageIdOrSlug)
      if (isValidInteger && data?.id === parseInt(imageIdOrSlug, 10) && data?.slug) {
        res.writeHead(302, { Location: `/${data.slug}` })
        res.end()
      }
    } catch (error: any) {
      //
    }
  }

  return { props: { initialImage } }
})

export default function ImagePage({ initialImage, userInfo }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const closeButtonRef = useRef<any>(null)
  const [hasCopied, setHasCopied] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isShortMaxWidth] = useState<boolean>(true)
  const [imageFinishedLoading, setImageFinishedLoading] = useState<boolean>(false)
  const [isFullView, setIsFullView] = useState<boolean>(false)
  const [image, setImage] = useState<ImageT | null>(initialImage)
  const [imageSrc, setImageSrc] = useState('')
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string>('')
  const [selectedCollectionIsPreview, setSelectedCollectionIsPreview] = useState<BooleanString>('false')
  const { artists, nextData, prevData, tags } = image || {}
  const title = getTitleOrUntitled(image?.title || null)
  const imageRef = useRef<any>(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setImageFinishedLoading(false)
      setImageSrc('')
      if (router.isReady) {
        try {
          const idOrSlug = router.asPath?.replace(/\//, '')
          let paramImageVersion = searchParams.get('v') as any
          paramImageVersion = paramImageVersion === 'original'
            ? 'no-border'
            : !paramImageVersion
              ? null
              : paramImageVersion
          const data = await getImage(idOrSlug)
          setImage(data)
          const showVideo = true
          const imageUrl = getAvailableImageUrl(paramImageVersion, data, showVideo)
          setImageSrc(imageUrl)

          setTimeout(async () => {
            setIsLoading(false)
            const data = await getAllCollections()
            const collections = data?.[0] || []
            setCollections(collections)
          }, 0)
        } catch (error: any) {
          if (error?.response?.status === 404) {
            const replacePath = pageRules.homePageIsGallery ? '/' : '/art'
            router.replace(replacePath)
          }
        }
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, searchParams])


  function tagBadgeOnClick(tag: Tag) {
    tagNavigation(tag)
  }

  function tagBadgeOnKeyUp(event: any, tag: Tag) {
    if (event?.key === 'Enter'){
      tagNavigation(tag)
    }
  }

  function tagNavigation(tag: Tag) {
    router.push(`/art?tagId=${tag?.id}`)
  }

  function handleImageClick() {
    setIsFullView(true)
  }

  function handleImageFinishedLoading(event: any) {
    setImageFinishedLoading(true)
  }

  async function handleShowAddToCollectionModal() {
    if (!selectedCollection) {
      alert('You must select a collection')
    } else if (!image?.id) {
      alert('Invalid image id')
    } else {
      await addImageToCollection({
        collection_id: parseInt(selectedCollection, 10),
        image_id: image.id,
        isPreview: selectedCollectionIsPreview === 'true'
      })
      alert('Successfully added to collection')
    }
  }

  const artistLinks = artists?.map((artist) => {
    const artistName = artist?.name
    return (
      <ArtistLink
        className={styles['artist-link']}
        has_profile_picture={artist.has_profile_picture}
        href={`/artist/${artist.id}`}
        id={artist.id}
        key={`artist-${artistName}`}
        name={artist.name}
      />
    )
  })

  const tagBadges = tags?.map((tag) => {
    const tagTitle = tag?.title
    return (
      <TagBadge
        className={styles['tab-badge']}
        onClick={() => tagBadgeOnClick(tag)}
        onKeyUp={(event) => tagBadgeOnKeyUp(event, tag)}
        key={`tag-${tagTitle}`}
        title={tagTitle}
      />
    )
  })

  const prevNav = (
    <Link className={styles['prev-svg']} href={`/${prevData?.slug ? prevData.slug : prevData?.id}`}>
      <FAIcon
        className='arrow-left'
        icon={faArrowLeft}
        title='Go to previous image'
      />
    </Link>
  )

  const nextNav = (
    <Link className={styles['next-svg']} href={`/${nextData?.slug ? nextData.slug : nextData?.id}`}>
      <FAIcon
        className='arrow-right'
        icon={faArrowRight}
        title='Go to next image'
      />
    </Link>
  )

  const generateCollectionOptions = () => {
    const options = collections?.map((collection) => {
      return (
        <option
          key={`add-to-collection-option-${collection.id}`}
          selected={selectedCollection === collection?.id?.toString()}
          value={collection?.id}>
          {collection?.title}
        </option>
      )
    })

    const unselectedOption = (
      <option
        key='add-to-collection-option-empty'
        selected={!selectedCollection}
        value=''>
        Select a collection
      </option>
    )

    options.unshift(unselectedOption)

    return options
  }

  const handleCopyToClipboard = () => {
    if (imageRef?.current) {
      setHasCopied(true)
      copyImageToClipboard(imageRef?.current)
      setTimeout(() => {
        setHasCopied(false)
      }, 1500)
    }
  }

  const copyButtonText = hasCopied ? 'copied! ' : 'copy '

  const collectionOptions = generateCollectionOptions()

  const artistNames = artists?.map((artist) => artist?.name)?.join(', ')

  const isVideo = checkIfImageUrlIsVideo(imageSrc)
  const isAnimation = checkIfImageUrlIsAnimation(imageSrc)
  const isImage = !!imageSrc && !isVideo && !isAnimation

  const downloadFileName =
    image && (isAnimation
      ? (image.slug ? `${image.slug}.gif` : image.id ? `${image.id}.gif` : 'image.gif')
      : isVideo
        ? (image.slug ? `${image.slug}.mp4` : image.id ? `${image.id}.mp4` : 'video.mp4')
        : (image.slug ? `${image.slug}.png` : image.id ? `${image.id}.png` : 'image.png')
    )

  const metaTitle = title
  const metaDescription = artistNames ? `by ${artistNames}` : ''
  const metaImageUrl = image?.has_no_border || image?.has_video
    ? getAvailableImageUrl('preview', image)
    : getAvailableImageUrl('border', image)

  return (
    <>
      <Head>
        <title>{`${configText.appName} - ${title}`}</title>
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
      <FullImageModal
        closeButtonRef={closeButtonRef}
        handleHide={() => setIsFullView(false)}
        imageSrc={imageSrc}
        show={isFullView}
        title={title}
      />
      <div className='container-fluid main-content-column overflow-y-scroll'>
        {isLoading && <LoadingSpinner fullHeight />}
        {
          !isLoading && (
            <div className='main-content-inner-wrapper'>
              <div className='container-fluid'>
                <div className={`${styles['header-wrapper']} ${styles['short-max-width']}`}>
                  <div className={`${styles['header-top-wrapper']}`}>
                    <h2 className={styles['header-top-title']}>{title}</h2>
                    <div className={styles['prev']}>
                      {prevData?.id && prevNav}
                    </div>
                    <div className={styles['next']}>
                      {nextData?.id && nextNav}
                    </div>
                    {/* <div className={styles['header-top-buttons']}>
                      <FAIcon
                        className={styles['header-top-icon']}
                        icon={faEdit}
                        title='Suggest an edit'
                      />
                      <FAIcon
                        className={styles['header-top-icon']}
                        icon={faStar}
                        title='Favorite'
                      />
                    </div> */}
                  </div>
                  {
                    !!artistLinks?.length && (
                      <div className='row'>
                        <div className={`col-md-12 ${styles['artist-link-wrappers']}`}>
                          {artistLinks}
                        </div>
                      </div>
                    )
                  }
                  <div className='row mt-2'>
                    <div className='col-md-8'>
                      {tagBadges}
                    </div>
                    <div className='col-md-4 ml'>
                      <ImageVersionLinks image={image} />
                    </div>
                  </div>
                  {
                    !!userInfo && (
                      <div className={styles['admin-buttons']}>
                        <button
                          className={`btn btn-warning btn-rounded ${styles['edit-button']}`}
                          onClick={() => router.push(`/admin/upload-image?editId=${image?.id}`)}
                          type="button">
                          <FAIcon
                            className={styles['edit-icon']}
                            icon={faEdit}
                            title='Edit'
                          />
                          Edit
                        </button>
                        {
                          ((pageRules.collections || pageRules.memeMaker)) && (
                            <>
                              <div className={styles['edit-collection']}>
                                <button
                                  className='btn btn-warning btn-rounded'
                                  onClick={handleShowAddToCollectionModal}
                                  type="button">
                                  <FAIcon
                                    className={styles['edit-icon']}
                                    icon={faPlus}
                                    title='Add to Collection'
                                  />
                                  Add to Collection
                                </button>
                                <div className='form-check'>
                                  <input
                                    className={`form-check-input ${styles['edit-toggle-input']}`}
                                    id='selected-collection-is-preview'
                                    onChange={(event: any) => {
                                      setSelectedCollectionIsPreview(event.target.checked?.toString())
                                    }}
                                    type="checkbox"
                                    value={selectedCollectionIsPreview}
                                  />
                                  <label className={`form-check-label ${styles['edit-toggle-input-label']}`} htmlFor='selected-collection-is-preview'>
                                    is image preview
                                  </label>
                                </div>
                              </div>
                              <div className={`mb-3 ${styles['edit-select']}`}>
                                <select
                                  aria-label='Select add to collection'
                                  className='form-select'
                                  id='select-add-to-collection'
                                  onChange={(event: any) => {
                                    setSelectedCollection(event.target.value)
                                  }}>
                                  {collectionOptions}
                                </select>
                              </div>
                            </>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <>
                      {/* IMAGE */}
                      {isImage && (
                        <>
                          <div className={`${styles['main-image-wrapper']} ${isShortMaxWidth ? styles['short-max-width'] : ''}`}>
                            <Image
                              alt={title}
                              className={`${styles['main-image']}`}
                              imageSrc={imageSrc}
                              innerRef={imageRef}
                              onClick={handleImageClick}
                              onLoad={handleImageFinishedLoading}
                              priority
                              stretchFill
                              title={title}
                            />
                          </div>
                          {imageFinishedLoading && image && (
                            <div className={styles['bottom-buttons']}>
                              <Button
                                as='button'
                                className={`btn btn-success ${styles['bottom-button']}`}
                                onClick={handleCopyToClipboard}>
                                <>
                                  {copyButtonText}
                                  <FAIcon className='' icon={faCopy} />
                                </>
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                      {/* ANIMATION */}
                      {isAnimation && (
                        <>
                          <div className={`${styles['main-image-wrapper']} ${isShortMaxWidth ? styles['short-max-width'] : ''}`}>
                            <Image
                              alt={title}
                              className={`${styles['main-image']}`}
                              imageSrc={imageSrc}
                              innerRef={imageRef}
                              onClick={handleImageClick}
                              onLoad={handleImageFinishedLoading}
                              priority
                              stretchFill
                              title={title}
                            />
                          </div>
                          {imageFinishedLoading && image && (
                            <div className={styles['bottom-buttons']}>
                              <Button
                                as='a'
                                className={`btn btn-success ${styles['bottom-button']}`}
                                download={downloadFileName}
                                href={imageSrc}>
                                Download{' '}
                                <FAIcon className='' icon={faDownload} />
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                      {/* VIDEO */}
                      {isVideo && (
                        <>
                          <div className={`${styles['main-image-wrapper']} ${isShortMaxWidth ? styles['short-max-width'] : ''}`}>
                            <Video
                              autoplay
                              className={`${styles['main-image']}`}
                              loop
                              onLoadedData={handleImageFinishedLoading}
                              stretchFill
                              title={title}
                              videoSrc={imageSrc}
                            />
                          </div>
                          <div className={styles['bottom-buttons']}>
                            <Button
                              as='a'
                              className={`btn btn-success ${styles['bottom-button']}`}
                              download={downloadFileName}
                              href={imageSrc}>
                              Download{' '}
                              <FAIcon className='' icon={faDownload} />
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          imageFinishedLoading && (
            <Footer />
          )
        }
      </div>
    </>
  )
}
