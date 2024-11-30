import Link from 'next/link'
import Image from '@/components/Image'
import styles from '@/styles/components/BannerImage.module.css'

type Props = {
  imageSrc: string
  title: string
}

export default function BannerImage({ imageSrc, title }: Props) {
  return (
    <div className={`${styles['banner-image-wrapper']}`}>
      <Link href='https://daumenfrosch.github.io/BlizzardBlitz/'>
        <Image
          alt={title}
          imageSrc={imageSrc}
          stretchFill
          priority
          title={title}
        />
      </Link>
    </div>
  )
}
