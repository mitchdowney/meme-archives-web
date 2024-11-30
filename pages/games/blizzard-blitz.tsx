import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const BlizzardBlitzRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('https://daumenfrosch.github.io/BlizzardBlitz/')
  }, [router])

  return (
    <Head>
      <meta property="og:title" content="Blizzard Blitz" />
      <meta property="og:description" content="Play Blizzard Blitz now!" />
      <meta property="og:image" content="https://daumen.gallery/blizzard-blitz-link-preview.png" />
      <meta property="og:url" content="https://daumen.gallery/games/blizzard-blitz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blizzard Blitz" />
      <meta name="twitter:description" content="Play Blizzard Blitz now!" />
      <meta name="twitter:image" content="https://daumen.gallery/blizzard-blitz-link-preview.png" />
    </Head>
  )
}

export default BlizzardBlitzRedirect
