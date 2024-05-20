import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from '@/components/Image'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { configPageText, configText } from '@/lib/constants/configurableText'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const splashLogoClass = isLoading ? styles['splash-logo-is-loading'] : styles['splash-logo']

  const metaTitle = configPageText.home.metaTitle
  const metaDescription = configPageText.home.metaDescription
  const metaImageUrl = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/logo-preview.png`

  const imageAlt = `${configText.text.appName} Logo`

  return (
    <>
      <Head>
        <title>{configText.text.appName}</title>
        <meta name='description' content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={configText.socials.twitterHandle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImageUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImageUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <div className='centered-column-grid'>
        <div className={styles['content-wrapper']}>
          <Link
            className='link-primary'
            href='/art'>
            <Image
              alt={imageAlt}
              className={splashLogoClass}
              imageSrc='/splash-logo.png'
              onLoad={() => setIsLoading(false)}
              priority
              stretchFill
              title={imageAlt}
            />
          </Link>
          {
            !isLoading && (
              <>
                <div className={styles['art-link-wrapper']}>
                  <Link
                    className={`link-primary ${styles['art-link']}`}
                    href='/art'>
                    Visit the Art Gallery
                  </Link>
                </div>
                <div className={styles['contract-wrapper']}>
                  <h2 className={styles['contract-label']}>CONTRACT:</h2>
                  <h2 className={styles['contract-address']}>8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3</h2>
                </div>
              </>
            )
          }
        </div>
        {
          !isLoading && (
            <Footer />
          )
        }
      </div>
    </>
  )
}
