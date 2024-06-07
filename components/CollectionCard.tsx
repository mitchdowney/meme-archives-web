import Link from 'next/link'
import { configMemeMaker } from '@/lib/constants/configurables'
import { Collection } from '@/lib/types'
import { getTitleOrUntitled } from '@/lib/utility'
import { getPreferredCollectionPageUrl } from '@/services/collection'
import { getImageUrl } from '@/services/image'
import styles from '@/styles/components/CollectionCard.module.css'
import Image from './Image'

type Props = {
  collection: Collection
}

export default function CollectionCard({ collection }: Props) {
  const title = getTitleOrUntitled(collection.title)
  const pageUrl = getPreferredCollectionPageUrl(collection)
  let typeText = 'Art Collection'
  if (collection?.type === 'discord-stickers') {
    typeText = 'Discord Stickers'
  } else if (collection?.type === 'telegram-stickers') {
    typeText = 'Telegram Stickers'
  } else if (collection?.type === 'meme-maker') {
    typeText = configMemeMaker.name
  }

  const first6PreviewImages = collection?.preview_images?.slice(0, 6) || []

  const generatePreviewImageElements = () => {
    let elements = []

    if (first6PreviewImages?.length > 0) {
      for (const previewImage of first6PreviewImages) {
        const preferredImageSrc = previewImage?.image_type
          ? getImageUrl(previewImage.image_id, previewImage.image_type)
          : ''
        
        elements.push(
          <div className={`${styles['collection-image-wrapper']}`} key={`${previewImage.image_id}`}>
            <div className='square-wrapper'>
              <Image
                alt={title}
                className='image-element image-element-all-border-radius'
                imageSrc={preferredImageSrc}
                priority
                stretchFill
                title={title}
              />
            </div>
          </div>
        )
      }
    }

    return elements
  }

  return (
    <Link href={pageUrl} className={`${styles['collection-card-wrapper']} remove-text-decoration`}>
      <div className={styles['collection-card']}>
        <div className={styles['collection-title']}>
          {title}
        </div>
        <div className={`text-secondary ${styles['collection-type']}`}>
          {typeText}
        </div>
        {
          first6PreviewImages?.length > 0 && (
            <div className={styles['collection-previews']}>
              {generatePreviewImageElements()}
            </div>
          )
        }
      </div>
    </Link>
  )
}
