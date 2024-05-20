import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ConfigStickerSet, configPageText, configStickerSets, configText } from '@/lib/constants/configurableText'

export default function Resources() {
  const metaTitle = configPageText.resources.metaTitle
  const metaDescription = configPageText.resources.metaDescription
  const metaImageUrl = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/public/logo-preview.png`
 
  const generateStickerLinks = () => {
    const stickerLinkElements = []
    for (const stickerSet of configStickerSets) {
      stickerLinkElements.push(generateStickerLink(stickerSet))
    }
    return stickerLinkElements
  }

  const generateStickerLink = (stickerSet: ConfigStickerSet) => {
    return (
      <p>
        <Link
          className='link-primary'
          href={stickerSet.href}
          target='_blank'>
          {stickerSet.title}
        </Link>
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
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
      <div className='container-fluid main-content-column'>
        <div className='main-content-inner-wrapper center-text'>
          <h3>Telegram Stickers</h3>
          {generateStickerLinks()}
        </div>
        <Footer />
      </div>
    </>
  )
}
