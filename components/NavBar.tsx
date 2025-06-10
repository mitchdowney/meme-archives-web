import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord'
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Image from '@/components/Image'
import FAIcon from './FAIcon'
import Icon from './Icon'

import styles from '@/styles/components/NavBar.module.css'
import { useEffect, useRef } from 'react'
import Dropdown, { DropdownItem } from './Dropdown'
import { configCharts, configMemeMaker, configSocials, configText, pageRules } from '@/lib/constants/configurables'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'

const navIconSize = 24

type NavLinkIconProps = {
  className?: string
  imageSrc: string
  title: string
  url: string
}

function NavLinkIcon({ className, imageSrc, title, url }: NavLinkIconProps) {
  return (
    <li className={`nav-item ${className}`}>
      <Link
        aria-label={title}
        className={`nav-link ${styles['nav-link-icon']}`}
        href={url}
        rel='noopener noreferrer'
        target='_blank'
        title={title}>
        <Icon
          height={navIconSize}
          imageSrc={imageSrc}
          title={title}
          width={navIconSize}
        />
      </Link>
    </li>
  )
}

type NavLinkFAIconProps = FontAwesomeIconProps & { url: string }

function NavLinkFAIcon({ icon, style, title, url }: NavLinkFAIconProps) {
  return (
    <li className='nav-item'>
      <Link
        aria-label={title}
        className={`nav-link ${styles['nav-link-icon']}`}
        href={url}
        rel='noopener noreferrer'
        style={style}
        target='_blank'>
        <FAIcon
          className='nav-link-fa-icon'
          icon={icon}
          title={title}
        />
      </Link>
    </li>
  )
}

type NavDropdownIconProps = {
  imageSrc: string
  title: string
  url: string
}

function NavDropdownIcon({ imageSrc, title, url }: NavDropdownIconProps) {
  return (
    <li>
      <Link
        aria-label={title}
        className={`dropdown-item ${styles['dropdown-item-icon']}`}
        href={url}
        rel='noopener noreferrer'
        target='_target'
        title={title}>
        <Icon
          height={navIconSize}
          imageSrc={imageSrc}
          title={title}
          width={navIconSize}
        />
      </Link>
    </li>
  )
}

const getDropdownMenuItems = () => {
  const dropdownItems: DropdownItem[] = []

  if (pageRules.videos) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-sm-none`,
      href: '/videos',
      label: 'Videos',
      target: '_self'
    })
  }

  if (pageRules.memeMaker) {
    dropdownItems.push({
      as: 'a',
      className: `${styles['dropdown-item']} d-sm-none`,
      href: configMemeMaker.urlPath,
      label: configMemeMaker.name,
      target: '_self'
    })
  }

  if (pageRules.artists) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/artists',
      label: 'Artists',
      target: '_self'
    })
  }

  if (pageRules.collections) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/collections',
      label: 'Collections',
      target: '_self'
    })
  }

  if (pageRules.stickers) {
    dropdownItems.push(    {
      className: `${styles['dropdown-item']} d-lg-none`,
      href: '/stickers',
      label: 'Stickers',
      target: '_self'
    })
  }

  if (pageRules.whitepaper) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-lg-none`,
      href: '/whitepaper',
      label: 'Whitepaper',
      target: '_self'
    })
  }

  if (pageRules.roadmap) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-xl-none`,
      href: '/roadmap',
      label: 'Roadmap',
      target: '_self'
    })
  }

  if (pageRules.resources) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-xl-none`,
      href: '/resources',
      label: 'Resources',
      target: '_self'
    })
  }

  if (
    configCharts.birdeyeUrl ||
    configCharts.dexscreenerUrl ||
    configCharts.dextoolsUrl ||
    configCharts.coingeckoUrl
  ) {
    const iconRowIcons = []
    if (configCharts.birdeyeUrl) {
      iconRowIcons.push(
        <NavDropdownIcon
          imageSrc='/external-sites/birdeye.svg'
          key='nav-birdeye-icon'
          title='Birdeye'
          url={configCharts.birdeyeUrl}
        />
      )
    }
    if (configCharts.dexscreenerUrl) {
      iconRowIcons.push(
        <NavDropdownIcon
          imageSrc='/external-sites/dexscreener.svg'
          key='nav-dexscreener-icon'
          title='DEX Screener'
          url={configCharts.dexscreenerUrl}
        />
      )
    }
    if (configCharts.dextoolsUrl) {
      iconRowIcons.push(
        <NavDropdownIcon
          imageSrc='/external-sites/dextools.svg'
          key='nav-dextools-icon'
          title='DEXTools'
          url={configCharts.dextoolsUrl}
        />
      )
    }
    if (configCharts.coingeckoUrl) {
      iconRowIcons.push(
        <NavDropdownIcon
          imageSrc='/external-sites/coingecko.svg'
          key='nav-coingecko-icon'
          title='CoinGecko'
          url={configCharts.coingeckoUrl}
        />
      )
    }

    dropdownItems.push({
      iconRow: (
        <div className={styles['nav-dropdown-icons']} key="nav-dropdown-icons">
          {iconRowIcons}
        </div>
      )
    })

  }

  return dropdownItems
}

export default function NavBar() {
  const buttonRef = useRef<any>(null)
  const pathname = usePathname()
  const isArtGallery = pathname === '/art'
  const isVideos = pathname === '/videos'
  const isArtists = pathname === '/artists'
  const isCollections = pathname === '/collections'
  const isStickers = pathname === '/stickers'
  const isWhitepaper = pathname === '/whitepaper'
  const isRoadmap = pathname === '/roadmap'
  const isResources = pathname === '/resources'
  const isMemeMaker = pathname === configMemeMaker.urlPath

  const handleOutsideClick = (event: any) => {
    const menuIsExpanded = !!document.querySelector('.navbar-collapse.collapse.show')
    if (menuIsExpanded) {
      const btn = document.querySelector('#navbar-button-toggle') as any
      setTimeout(() => {
        btn?.click()
      }, 100)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const dropdownItems: DropdownItem[] = getDropdownMenuItems()
  
  const imageAlt = `${configText.appName} Logo`

  return (
    <nav
      className={`navbar fixed-top navbar-expand-sm ${styles.navbar}`}>
      <div className='container-fluid'>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className='navbar-brand d-none d-sm-block' href='/'>
          <Image
            alt={imageAlt}
            height={48}
            imageSrc='/horizontal-logo.png'
            priority
            style={{ marginTop: '1px' }}
            title={imageAlt}
            width={175}
          />
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className='navbar-brand d-block d-sm-none' href='/'>
          <Image
            alt={imageAlt}
            height={48}
            imageSrc='/horizontal-logo.png'
            priority
            style={{ marginTop: '1px' }}
            title={imageAlt}
            width={175}
          />
        </a>
        <button
          className='navbar-toggler'
          id='navbar-button-toggle'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          ref={buttonRef}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto d-flex flex-grow-1'>
            {/* {
              pageRules.gallery && (
                <li className='nav-item'>
                  <a
                    className={`nav-link ${styles['nav-link-text']} ${isArtGallery ? 'active' : ''}`}
                    {...(isArtGallery ? { 'aria-current': 'page' } : {})}
                    href={pageRules.homePageIsGallery ? '/' : '/art'}>
                    $Dank Memes
                  </a>
                </li>
              )
            } */}
            {
              pageRules.videos && (
                <li className='nav-item d-block d-sm-block'>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    className={`nav-link ${styles['nav-link-text']} ${isVideos ? 'active' : ''}`}
                    {...(isVideos ? { 'aria-current': 'page' } : {})}
                    href='/videos'>
                    Videos
                  </a>
                </li>
              )
            }
            {
              pageRules.memeMaker && (
                <li className='nav-item d-block d-sm-block'>
                  <a
                    className={`nav-link ${styles['nav-link-text']} ${isMemeMaker ? 'active' : ''}`}
                    {...(isMemeMaker ? { 'aria-current': 'page' } : {})}
                    href={configMemeMaker.urlPath}>
                    {configMemeMaker.name}
                  </a>
                </li>
              )
            }
            {
              pageRules.artists && (
                <li className='nav-item d-block d-sm-none d-md-block d-lg-block d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isArtists ? 'active' : ''}`}
                    {...(isArtists ? { 'aria-current': 'page' } : {})}
                    href='/artists'>
                    Artists
                  </Link>
                </li>
              )
            }
            {
              pageRules.collections && (
                <li className='nav-item d-block d-sm-none d-md-block d-lg-block d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isCollections ? 'active' : ''}`}
                    {...(isCollections ? { 'aria-current': 'page' } : {})}
                    href='/collections'>
                    Collections
                  </Link>
                </li>
              )
            }
            {
              pageRules.stickers && (
                <li className='nav-item d-block d-sm-none d-md-none d-lg-block d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isStickers ? 'active' : ''}`}
                    {...(isStickers ? { 'aria-current': 'page' } : {})}
                    href='/stickers'>
                    Stickers
                  </Link>
                </li>
              )
            }
            {
              pageRules.whitepaper && (
                <li className='nav-item d-block d-sm-none d-md-none d-lg-block d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isWhitepaper ? 'active' : ''}`}
                    {...(isWhitepaper ? { 'aria-current': 'page' } : {})}
                    href='/whitepaper'>
                    Whitepaper
                  </Link>
                </li>
              )
            }
            {
              pageRules.roadmap && (
                <li className='nav-item d-block d-sm-none d-md-none d-lg-none d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isRoadmap ? 'active' : ''}`}
                    {...(isRoadmap ? { 'aria-current': 'page' } : {})}
                    href='/roadmap'>
                    Roadmap
                  </Link>
                </li>
              )
            }
            {
              pageRules.resources && (
                <li className='nav-item d-block d-sm-none d-md-none d-lg-none d-xl-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isResources ? 'active' : ''}`}
                    {...(isResources ? { 'aria-current': 'page' } : {})}
                    href='/resources'>
                    Resources
                  </Link>
                </li>
              )
            }
            {
              (configSocials.farcasterUrl
              || configSocials.telegramUrl
              || configSocials.discordUrl
              || configSocials.twitterUrl
              || configSocials.instagramUrl
              || configSocials.tiktokUrl
              || configSocials.youtubeUrl
              || configSocials.linktreeUrl) && (
                <>
                  <div className='flex-grow-1' />
                  <div className={styles['social-links']}>
                    {
                      configSocials.telegramUrl && (
                        <NavLinkFAIcon
                          icon={faTelegram}
                          style={{ marginRight: '-1px' }}
                          title='Telegram'
                          url={configSocials.telegramUrl}
                        />
                      )
                    }
                    {
                      configSocials.discordUrl && (
                        <NavLinkFAIcon
                          icon={faDiscord}
                          title='Discord'
                          url={configSocials.discordUrl}
                        />
                      )
                    }
                    {
                      configSocials.twitterUrl && (
                        <NavLinkFAIcon
                          icon={faXTwitter}
                          title='X - Twitter'
                          url={configSocials.twitterUrl}
                        />
                      )
                    }
                    {
                      configSocials.instagramUrl && (
                        <NavLinkFAIcon
                          icon={faInstagram}
                          style={{ marginTop: '1px' }}
                          title='Instagram'
                          url={configSocials.instagramUrl}
                        />
                      )
                    }
                    {
                      configSocials.tiktokUrl && (
                        <NavLinkFAIcon
                          icon={faTiktok}
                          title='TikTok'
                          url={configSocials.tiktokUrl}
                        />
                      )
                    }
                    {
                      configSocials.youtubeUrl && (
                        <NavLinkFAIcon
                          icon={faYoutube}
                          title='YouTube'
                          url={configSocials.youtubeUrl}
                        />
                      )
                    }
                    {
                      configSocials.farcasterUrl && (
                        <NavLinkIcon
                          imageSrc='/external-sites/farcaster.png'
                          title='Farcaster'
                          url={configSocials.farcasterUrl}
                        />
                      )
                    }
                    {
                      configSocials.linktreeUrl && (
                        <NavLinkIcon
                          imageSrc='/external-sites/linktree.png'
                          title='Linktree'
                          url={configSocials.linktreeUrl}
                        />
                      )
                    }
                  </div>
                </>
              )
            }
            {
              (configCharts.birdeyeUrl
              || configCharts.dexscreenerUrl
              || configCharts.dextoolsUrl
              || configCharts.coingeckoUrl) && (
                <div className={styles['social-links']}>
                  {
                    configCharts.birdeyeUrl && (
                      <NavLinkIcon
                        className='d-sm-none d-md-none d-xl-block'
                        imageSrc='/external-sites/birdeye.svg'
                        title='Birdeye'
                        url={configCharts.birdeyeUrl}
                      />
                    )
                  }
                  {
                    configCharts.dexscreenerUrl && (
                      <NavLinkIcon
                        className='d-sm-none d-md-none d-xl-block dexscreener-icon'
                        imageSrc='/external-sites/dexscreener.svg'
                        title='DEX Screener'
                        url={configCharts.dexscreenerUrl}
                      />
                    )
                  }
                  {
                    configCharts.dextoolsUrl && (
                      <NavLinkIcon
                        className='d-sm-none d-md-none d-xl-block'
                        imageSrc='/external-sites/dextools.svg'
                        title='DEXTools'
                        url={configCharts.dextoolsUrl}
                      />
                    )
                  }
                  {
                    configCharts.coingeckoUrl && (
                      <NavLinkIcon
                        className='d-sm-none d-md-none d-xl-block'
                        imageSrc='/external-sites/coingecko.svg'
                        title='CoinGecko'
                        url={configCharts.coingeckoUrl}
                      />
                    )
                  }
                  {
                    dropdownItems?.length > 0 && (
                      <div className='d-none d-sm-block d-xl-none'>
                        <Dropdown
                          alignRight
                          dropdownClassName={styles['dropdown']}
                          dropdownToggleClassName={styles['dropdown-toggle']}
                          dropdownMenuClassName={styles['dropdown-menu']}
                          dropdownItems={dropdownItems}
                        />
                      </div>
                    )
                  }
                </div>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
