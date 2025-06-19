import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import ArtistLink from '@/components/ArtistLink'
import Button from '@/components/Button'
import Image from '@/components/Image'
import LoadingSpinner from '@/components/LoadingSpinner'
import TagBadge from '@/components/TagBadge'
import { Artist, BooleanString, ImageMediumType, Image as ImageT, Tag } from '@/lib/types'
import { ImageType, createImage, deleteImage, getImage, getImageUrl, updateImage } from '@/services/image'
import styles from '@/styles/AdminUploadImage.module.css'
import { useRouter } from 'next/router'
import SearchInputTags from '@/components/SearchInputTags'
import { getAllTags } from '@/services/tag'
import { getAllArtists } from '@/services/artist'
import SearchInputArtists from '@/components/SearchInputArtists'
import { configPageText, configSocials, pageRules } from '@/lib/constants/configurables'
import Video from '@/components/Video'

type LastUpdatedData = {
  id: number
  slug?: string
} | null

export const getServerSideProps = async () => {
  if (!pageRules.admin) {
    return {
      notFound: true
    }
  }

  return { props: {} }
}

export default function UploadImage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [allArtists, setAllArtists] = useState<Artist[]>([])
  const [artistInputText, setArtistInputText] = useState<string>('')
  const [artistNames, setArtistNames] = useState<string[]>([])
  const [editingImage, setEditingImage] = useState<ImageT | null>(null)
  const [imageNoBorderSrc, setImageNoBorderSrc] = useState<string>('')
  const [imageBorderSrc, setImageBorderSrc] = useState<string>('')
  const [imageAnimationSrc, setImageAnimationSrc] = useState<string>('')
  const [imageVideoSrc, setImageVideoSrc] = useState<string>('')
  const [imageType, setImageType] = useState<ImageType>('painting')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [lastUpdatedData, setLastUpdatedData] = useState<LastUpdatedData>(null)
  const [preventBorderImage, setPreventBorderImage] = useState<BooleanString>(pageRules.disableBorderImages ? 'true' : 'false')
  const [previewCropPosition, setPreviewCropPosition] =
    useState<'top' | 'middle' | 'bottom' | 'no-crop'>(pageRules.defaultPreviewCropStyle)
  const [allowPreviewImage, setAllowPreviewImage] = useState<BooleanString>(pageRules.disableBorderImages ? 'false' : 'true')
  const [removeAnimation, setRemoveAnimation] = useState<BooleanString>('false')
  const [removeBorder, setRemoveBorder] = useState<BooleanString>('false')
  const [removeNoBorder, setRemoveNoBorder] = useState<BooleanString>('false')
  const [removeVideo, setRemoveVideo] = useState<BooleanString>('false')
  const [slug, setSlug] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [tagInputText, setTagInputText] = useState<string>('')
  const [tagTitles, setTagTitles] = useState<string[]>([])

  const shouldPreventBorderImage = preventBorderImage === 'true'
  const willCropPreviewImage = (shouldPreventBorderImage && allowPreviewImage === 'false')
    || (!imageNoBorderSrc && imageBorderSrc)

  useEffect(() => {
    (async () => {
      try {
        const editId = searchParams.get('editId')
        if (editId) {
          setTimeout(async () => {
            setIsLoading(true)
            setIsEditing(true)
            const image = await getImage(editId)
            setEditingImage(image)
            populateEditData(image)
            setLastUpdatedData({
              id: image.id,
              slug: image.slug
            })
            setIsLoading(false)
          }, 100)
        }

        const allTags = await getAllTags()
        setAllTags(allTags)
        const allArtists = await getAllArtists()
        setAllArtists(allArtists)
      } catch (error) {
        //
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const populateEditData = (paramImage: ImageT | null) => {
    const image = paramImage ? paramImage : editingImage
    if (image) {
      const { artists, has_animation, has_border, has_no_border, has_video,
        id, slug, tags, title, type } = image

      setTitle(title || '')
        
      const tagTitles = tags.map((tag) => tag.title || '')
      setTagTitles(tagTitles)

      const artistNames = artists.map((artist) => artist.name || '')
      setArtistNames(artistNames)

      setSlug(slug || '')

      setImageType(type || 'painting')

      if (has_animation) {
        setImageAnimationSrc(getImageUrl(id, 'animation'))
      }

      if (has_border) {
        setImageBorderSrc(getImageUrl(id, 'border'))
      }

      if (has_no_border) {
        setImageNoBorderSrc(getImageUrl(id, 'no-border'))
      }

      if (has_video) {
        setImageVideoSrc(getImageUrl(id, 'video'))
      }
    }
  }

  const handleTypeChange = (event: any) => {
    setImageType(event.target.value)
    if (event.target.value === 'meme') {
      setPreventBorderImage('true')
    } else {
      setPreventBorderImage('false')
      setAllowPreviewImage('true')
    }
  }
  
  const handleChooseImage = (imageMediumType: ImageMediumType, event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader()

      reader.onload = function(e) {
        if (e?.target?.result) {
          const result = e.target.result as string
          if (imageMediumType === 'no-border') {
            setImageNoBorderSrc(result)
          } else if (imageMediumType === 'border') {
            setImageBorderSrc(result)
          } else if (imageMediumType === 'animation') {
            setImageAnimationSrc(result)
          } else if (imageMediumType === 'video') {
            setImageVideoSrc(result)
          }
        }
      }

      reader.readAsDataURL(fileInput.files[0])
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleAddArtist = (selectedArtistName?: string) => {
    const newArtistName = selectedArtistName || artistInputText
    if (newArtistName && !artistNames?.some((artistName) =>
      artistName?.toLowerCase() === newArtistName?.toLowerCase())) {
      const newArtistNames = artistNames.concat(newArtistName)
      setArtistNames(newArtistNames)
      setArtistInputText('')
    }
  }

  const handleArtistEnterPress = (artistName: string, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRemoveArtist(artistName)
    }
  }

  const handleRemoveArtist = (artistNameToRemove: string) => {
    const newArtistNames = artistNames.filter((artistName) => {
      return artistNameToRemove !== artistName
    })
    setArtistNames(newArtistNames)
  }

  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlug(event.target.value?.trim())
  }

  const handleAddTag = (selectedTagTitle?: string) => {
    const newTagTitle = selectedTagTitle || tagInputText
    if (newTagTitle && !tagTitles.includes(newTagTitle)) {
      const newTagTitles = tagTitles.concat(newTagTitle?.trim())
      setTagTitles(newTagTitles)
      setTagInputText('')
    }
  }

  const handleTagEnterPress = (tag: string, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRemoveTag(tag)
    }
  }
  
  const handleRemoveTag = (tagTitleToRemove: string) => {
    const newTagTitles = tagTitles.filter((tagTitle) => {
      return tagTitleToRemove !== tagTitle
    })
    setTagTitles(newTagTitles)
  }

  const handleDelete = async () => {
    if (editingImage?.id && confirm('Are you sure you want to delete this image?') === true) {
      await deleteImage(editingImage.id)
      router.push('/admin')
    }
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    const formData = new FormData()
    formData.append('type', imageType)
    formData.append('slug', slug?.toLowerCase())
    formData.append('tagTitles', JSON.stringify(tagTitles))
    formData.append('artistNames', JSON.stringify(artistNames))
    formData.append('title', title)

    const imageNoBorderFileInput = document.getElementById('image-no-border-file') as any
    const imageNoBorderFile = imageNoBorderFileInput?.files?.[0]
    
    if (imageNoBorderFile) {
      formData.append('fileImageNoBorders', imageNoBorderFile)
    }

    const imageBorderFileInput = document.getElementById('image-border-file') as any
    const imageBorderFile = imageBorderFileInput?.files?.[0]
    if (imageBorderFile) {
      formData.append('fileImageBorders', imageBorderFile)
    }

    const imageAnimationFileInput = document.getElementById('image-animation-file') as any
    const imageAnimationFile = imageAnimationFileInput?.files?.[0]
    if (imageAnimationFile) {
      formData.append('fileImageAnimations', imageAnimationFile)
    }

    const imageVideoFileInput = document.getElementById('image-video-file') as any
    const imageVideoFile = imageVideoFileInput?.files?.[0]
    if (imageVideoFile) {
      formData.append('fileImageVideos', imageVideoFile)
    }

    if (removeAnimation === 'true') {
      formData.append('remove_animation', 'true')
    }

    if (removeBorder === 'true') {
      formData.append('remove_border', 'true')
    }

    if (removeNoBorder === 'true') {
      formData.append('remove_no_border', 'true')
    }

    if (removeVideo === 'true') {
      formData.append('remove_video', 'true')
    }

    if (preventBorderImage === 'true') {
      formData.append('prevent_border_image', 'true')
    }

    if (allowPreviewImage === 'true') {
      formData.append('allow_preview_border_image', 'true')
    }

    if (willCropPreviewImage && previewCropPosition) {
      formData.append('preview_crop_position', previewCropPosition)
    }

    try {
      let data: any = null

      if (isEditing && editingImage) {
        data = await updateImage(editingImage.id, formData)
        location.href = `/${editingImage.id}`
        return
      } else {
        data = await createImage(formData)
        handleClear()
        setLastUpdatedData({
          id: data.id,
          slug: data.slug
        })
        const scrollableDiv = document.querySelector('.main-content-column')
        if (scrollableDiv) scrollableDiv.scrollTop = 0
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert(error.message)
      }
    }
    setIsSaving(false)
  }

  const handleClear = () => {
    if (isEditing) {
      populateEditData(null)
    } else {
      const imageNoBorderInput = document.getElementById('image-no-border-file') as any
      const imageBorderInput = document.getElementById('image-border-file') as any
      const imageAnimationInput = document.getElementById('image-animation-file') as any
      const imageVideoInput = document.getElementById('image-video-file') as any
  
      setImageNoBorderSrc('')
      if (imageNoBorderInput) imageNoBorderInput.value = ''
  
      if (imageBorderInput) imageBorderInput.value = ''
      setImageBorderSrc('')
      
      if (imageAnimationInput) imageAnimationInput.value = ''
      setImageAnimationSrc('')

      if (imageVideoInput) imageVideoInput.value = ''
      setImageVideoSrc('')
  
      setImageType('painting')
      setTitle('')
      setTagInputText('')
      setTagTitles([])
      setArtistInputText('')
      setArtistNames([])
      setSlug('')
      setPreventBorderImage(pageRules.disableBorderImages ? 'true' : 'false')
      setAllowPreviewImage('true')
      setPreviewCropPosition(pageRules.defaultPreviewCropStyle)
    }
  }

  const tagBadges = tagTitles.map((tagTitle) => {
    return (
      <TagBadge
        key={`tag-${tagTitle}`}
        onRemoveClick={() => handleRemoveTag(tagTitle)}
        onRemoveKeyUp={(event) => handleTagEnterPress(tagTitle, event)}
        title={tagTitle}
      />
    )
  })

  const artistLinks = artistNames.map((artistName) => {
    const existingArtist = allArtists.find((artist) => artistName === artist.name)
    return (
      <ArtistLink
        has_profile_picture={existingArtist?.has_profile_picture}
        key={`artist-${artistName}`}
        id={existingArtist?.id}
        name={artistName}
        onRemoveClick={() => handleRemoveArtist(artistName)}
        onRemoveKeyUp={(event) => handleArtistEnterPress(artistName, event)}
        withBorder
      />
    )
  })

  const generateImageNodes = (imageMediumType: ImageMediumType) => {
    let id = ''
    let label = ''
    let isImageSelected = false
    let isVideoSelected = false
    let imageSrc: string | ArrayBuffer = ''
    let imageAlt = ''
    let deleteText = ''
    let deleteCheckId = ''
    let removeValue = ''
    let onChange: any = null

    if (imageMediumType === 'no-border') {
      id = 'image-no-border-file'
      label = 'Select Image'
      isImageSelected = !!imageNoBorderSrc
      imageSrc = imageNoBorderSrc
      imageAlt = 'Image preview without border'
      deleteText = 'Delete no border image'
      deleteCheckId = 'image-no-border-delete'
      removeValue = String(removeNoBorder)
      onChange = (event: any) => {
        setRemoveNoBorder(event.target.checked?.toString())
      }
    } else if (imageMediumType === 'border') {
      id = 'image-border-file'
      label = 'Select Border Image'
      isImageSelected = !!imageBorderSrc
      imageSrc = imageBorderSrc
      imageAlt = 'Image preview with border'
      deleteText = 'Delete border image'
      deleteCheckId = 'image-border-delete'
      removeValue = String(removeBorder)
      onChange = (event: any) => {
        setRemoveBorder(event.target.checked?.toString())
      }
    } else if (imageMediumType === 'animation') {
      id = 'image-animation-file'
      label = 'Select GIF'
      isImageSelected = !!imageAnimationSrc
      imageSrc = imageAnimationSrc
      imageAlt = 'GIF preview'
      deleteText = 'Delete animation image'
      deleteCheckId = 'image-animation-delete'
      removeValue = String(removeAnimation)
      onChange = (event: any) => {
        setRemoveAnimation(event.target.checked?.toString())
      }
    } else if (imageMediumType === 'video') {
      id = 'image-video-file'
      label = 'Select MP4'
      isVideoSelected = !!imageVideoSrc
      imageSrc = imageVideoSrc
      imageAlt = 'MP4 preview'
      deleteText = 'Delete video image'
      deleteCheckId = 'image-video-delete'
      removeValue = String(removeVideo)
      onChange = (event: any) => {
        setRemoveVideo(event.target.checked?.toString())
      }
    }

    return (
      <>
        <div className="my-4 text-center">
          <button
            className={`btn btn-success btn-rounded ${styles['image-file-button']}`}
            type="button">
            <label
              className={`form-label text-white ${styles['image-file-label']}`}
              htmlFor={id}>
              {label}
            </label>
            <input
              className='form-control d-none'
              id={id}
              onChange={(event) => handleChooseImage(imageMediumType, event)}
              type="file" />
          </button>
          {
            isEditing && (
              <div className={`form-check ${styles['remove-image-toggle-wrapper']}`}>
                <input
                  className={`form-check-input ${styles['remove-image-toggle']}`}
                  id={deleteCheckId}
                  onChange={onChange}
                  type="checkbox"
                  value={removeValue}
                />
                <label className="form-check-label" htmlFor={deleteCheckId}>
                  {deleteText}
                </label>
              </div>
            )
          }
        </div>
        {
          isImageSelected && (
            <div className="my-4">
              <Image
                alt={imageAlt}
                className={styles['image-preview']}
                imageSrc={imageSrc}
                stretchFill
                title={imageAlt}
              />
            </div>
          )
        }
        {
          isVideoSelected && (
            <div className="my-4">
              <Video
                className={styles['image-preview']}
                stretchFill
                title={imageAlt}
                videoSrc={imageSrc}
              />
            </div>
          )
        }
        <hr />
      </>
    )
  }

  const pageTitle = isEditing ? 'Edit Image' : 'Upload Image'
  const saveButtonTitle = isEditing ? 'Update' : 'Save'
  const clearButtonTitle = isEditing ? 'Reset' : 'Clear'

  const metaTitle = configPageText.uploadImage.metaTitle
  const metaDescription = configPageText.uploadImage.metaDescription
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
        <meta name="robots" content="noindex" />
      </Head>
      <div className='main-content-column'>
        <div className='main-content-inner-wrapper'>
          {
            isLoading && (
              <LoadingSpinner />
            )
          }
          {
            !isLoading && (
              <form className='form-wrapper' onSubmit={() => false}>
                {
                  lastUpdatedData && (
                    <div>
                      <div>
                        Last uploaded: 
                      </div>
                      <div>
                        <Link href={`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/${lastUpdatedData.id}`}>
                          {`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/${lastUpdatedData.id}`}
                        </Link>
                      </div>
                      {
                        lastUpdatedData?.slug && (
                          <div>
                            <Link href={`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/${lastUpdatedData.slug}`}>
                              {`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/${lastUpdatedData.slug}`}
                            </Link>
                          </div>
                        )
                      }
                      <hr className='mt-4 mb-3' />
                    </div>
                  )
                }
                <h2>{pageTitle}</h2>
                {
                  !pageRules.disableImageTypes && (
                    <>
                      <div className={`${styles['form-select-wrapper']} mb-4`}>
                        <label htmlFor='image-type'>
                          Image type
                        </label>
                        <select
                          aria-label='Image type'
                          className='form-select'
                          id='link-image-type'
                          onChange={handleTypeChange}>
                          <option selected={imageType === 'painting'} value="painting">Painting</option>
                          <option selected={imageType === 'meme'} value="meme">Meme</option>
                          <option selected={imageType === 'painting-and-meme'} value="painting-and-meme">Painting and Meme</option>
                        </select>
                      </div>
                      <hr />
                    </>
                  )
                }
                {generateImageNodes('no-border')}
                {!pageRules.disableBorderImages && (generateImageNodes('border'))}
                {generateImageNodes('animation')}
                {generateImageNodes('video')}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    className="form-control"
                    id="title"
                    onChange={(e) => handleTitleChange(e)}
                    placeholder='Untitled'
                    type="text"
                    value={title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tags</label>
                  <SearchInputTags
                    allTags={allTags}
                    handleSelectTag={handleAddTag}
                    inputText={tagInputText}
                    setInputText={setTagInputText}
                  />
                </div>
                {
                  tagBadges?.length > 0 && (
                    <div className="mb-3">
                      {tagBadges}
                    </div>
                  )
                }
                <div className="mb-3">
                  <label htmlFor="artist" className="form-label">Artists</label>
                  <SearchInputArtists
                    allArtists={allArtists}
                    handleSelectArtist={handleAddArtist}
                    inputText={artistInputText}
                    setInputText={setArtistInputText}
                  />
                </div>
                {
                  artistLinks?.length > 0 && (
                    <div className="mb-3">
                      {artistLinks}
                    </div>
                  )
                }
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">Slug</label>
                  <input
                    className="form-control"
                    id="slug"
                    onChange={(e) => handleSlugChange(e)}
                    placeholder='optional'
                    type="text"
                    value={slug}
                  />
                  <div id="emailHelp" className="form-text">{'Alphanumeric and hyphens only. Slug is used for a custom url path.'}</div>
                </div>
                {
                  (imageNoBorderSrc && !imageBorderSrc) && (
                    <div className={`form-check ${styles['form-toggle-wrapper']}`}>
                      <input
                        checked={preventBorderImage === 'true'}
                        className={`form-check-input ${styles['remove-image-toggle']}`}
                        id='prevent-border-image'
                        onChange={(event: any) => {
                          setPreventBorderImage(event.target.checked?.toString())
                        }}
                        type="checkbox"
                        value={preventBorderImage?.toString()}
                      />
                      <label className="form-check-label" htmlFor={'prevent-border-image'}>
                        Prevent border image
                      </label>
                    </div>
                  )
                }
                {
                  (imageNoBorderSrc && !imageBorderSrc && shouldPreventBorderImage) && (
                    <div className={`form-check ${styles['form-toggle-wrapper']}`}>
                      <input
                        checked={allowPreviewImage === 'true'}
                        className={`form-check-input ${styles['remove-image-toggle']}`}
                        id='allow-preview-image'
                        onChange={(event: any) => {
                          setAllowPreviewImage(event.target.checked?.toString())
                        }}
                        type="checkbox"
                        value={allowPreviewImage?.toString()}
                      />
                      <label className="form-check-label" htmlFor={'allow-preview-image'}>
                        Allow preview border image
                      </label>
                    </div>
                  )
                }
                {
                  imageNoBorderSrc && !imageBorderSrc && willCropPreviewImage && (
                    <div className={`${styles['form-select-wrapper']}`}>
                      <label htmlFor='link-preview-crop-position'>
                        Preview crop position
                      </label>
                      <select
                        aria-label='Link preview crop position'
                        className='form-select'
                        id='link-preview-crop-position'
                        onChange={(event: any) => {
                          setPreviewCropPosition(event.target.value)
                        }}>
                        <option selected={previewCropPosition === 'top'} value="top">Top</option>
                        <option selected={previewCropPosition === 'middle'} value="middle">Middle</option>
                        <option selected={previewCropPosition === 'bottom'} value="bottom">Bottom</option>
                        <option selected={previewCropPosition === 'no-crop'} value="no-crop">No Crop</option>
                      </select>
                    </div>
                  )
                }
                <div className={`mt-5 mb-5 text-end ${styles['bottom-button-row']}`}>
                  {
                    isEditing && (
                      <Button
                        className={`btn btn-danger ${styles['bottom-button-left']}`}
                        onClick={handleDelete}
                        type="button">
                        Delete
                      </Button>
                    )
                  }
                  <Button
                    className={`btn btn-secondary ${styles['bottom-button']}`}
                    onClick={handleClear}
                    type="button">
                    {clearButtonTitle}
                  </Button>
                  <Button
                    className={`btn btn-primary ms-3 ${styles['bottom-button']}`}
                    isLoading={isSaving}
                    onClick={handleSubmit}
                    type="button">
                    {saveButtonTitle}
                  </Button>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </>
  )
}
