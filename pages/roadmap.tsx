import Head from 'next/head'
import styles from '@/styles/Roadmap.module.css'
import Image from '@/components/Image'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { configPageText, configSocials, configText, pageRules } from '@/lib/constants/configurables'

export const getServerSideProps = async () => {
  if (!pageRules.roadmap) {
    return {
      notFound: true
    }
  }

  return { props: {} }
}

export default function Roadmap() {
  const [imageIsLoading, setImageIsLoading] = useState(true)

  const handleImageOnLoad = () => {
    setImageIsLoading(!imageIsLoading)
  }

  const metaTitle = configPageText.roadmap.metaTitle
  const metaDescription = configPageText.roadmap.metaDescription
  const metaImageUrl = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/public/roadmap.png`
 
  const imageAlt = `${configText.appName} roadmap`

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
      <div className='container-fluid main-content-column'>
        <div className='main-content-inner-wrapper'>
          <div className={styles['roadmap-image-wrapper']}>
            <Image
              alt={imageAlt}
              className={styles['roadmap-image']}
              imageSrc='/roadmap.png'
              onLoad={handleImageOnLoad}
              priority
              stretchFill
              title={imageAlt}
            />
          </div>
        </div>
        {!imageIsLoading && <Footer />}
      </div>
    </>
  )
}
