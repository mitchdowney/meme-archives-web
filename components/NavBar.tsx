import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
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
import { configCharts, configSocials, configText, pageRules } from '@/lib/constants/configurables'

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

  if (pageRules.stickers) {
    dropdownItems.push(    {
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/stickers',
      label: 'Stickers',
      target: '_self'
    })
  }

  if (pageRules.memes) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/art?type=memes',
      label: 'Memes',
      target: '_self'
    })
  }

  if (pageRules.whitepaper) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/whitepaper',
      label: 'Whitepaper',
      target: '_self'
    })
  }

  if (pageRules.roadmap) {
    dropdownItems.push({
      className: `${styles['dropdown-item']} d-md-none`,
      href: '/roadmap',
      label: 'Roadmap',
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
  const searchParams = useSearchParams()
  const queryParamType = searchParams.get('type') as any
  const isArtGallery = pathname === '/art' && queryParamType !== 'memes'
  const isArtists = pathname === '/artists'
  const isCollections = pathname === '/collections'
  const isStickers = pathname === '/stickers'
  const isWhitepaper = pathname === '/whitepaper'
  const isRoadmap = pathname === '/roadmap'
  const isMemes = pathname === '/art' && queryParamType === 'memes'

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
      className={`navbar fixed-top navbar-expand-sm navbar-light bg-light ${styles.navbar}`}>
      <div className='container-fluid'>
        <Link className='navbar-brand d-none d-sm-block' href='/'>
          <Image
            alt={imageAlt}
            height={48}
            imageSrc='/logo-small-square.png'
            priority
            title={imageAlt}
            width={48}
          />
        </Link>
        <Link className='navbar-brand d-block d-sm-none' href='/'>
          <Image
            alt={imageAlt}
            height={48}
            imageSrc='/horizontal-logo.png'
            priority
            title={imageAlt}
            width={48}
          />
        </Link>
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
            {
              pageRules.gallery && (
                <li className='nav-item'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isArtGallery ? 'active' : ''}`}
                    {...(isArtGallery ? { 'aria-current': 'page' } : {})}
                    href={pageRules.homePageIsGallery ? '/' : '/art'}>
                    Gallery
                  </Link>
                </li>
              )
            }
            {
              pageRules.memes && (
                <li className='nav-item d-block d-sm-none d-md-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isMemes ? 'active' : ''}`}
                    {...(isMemes ? { 'aria-current': 'page' } : {})}
                    href={pageRules.homePageIsGallery ? '/' : '/art?type=memes'}>
                    Memes
                  </Link>
                </li>
              )
            }
            {
              pageRules.artists && (
                <li className='nav-item'>
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
                <li className='nav-item'>
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
                <li className='nav-item d-block d-sm-none d-md-block d-lg-block d-xl-block'>
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
                <li className='nav-item d-block d-sm-none d-md-none d-lg-block'>
                  <Link
                    className={`nav-link ${styles['nav-link-text']} ${isRoadmap ? 'active' : ''}`}
                    {...(isRoadmap ? { 'aria-current': 'page' } : {})}
                    href='/roadmap'>
                    Roadmap
                  </Link>
                </li>
              )
            }
            {/* <li className='nav-item d-block d-sm-none'>
              <Link
                className={`nav-link ${styles['nav-link-text']} ${isResources ? 'active' : ''}`}
                {...(isResources ? { 'aria-current': 'page' } : {})}
                href='/resources'>
                Resources
              </Link>
            </li> */}
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
                configSocials.twitterUrl && (
                  <NavLinkFAIcon
                    icon={faXTwitter}
                    title='X - Twitter'
                    url={configSocials.twitterUrl}
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
            </div>
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
                    className='d-sm-none d-md-none d-xl-block'
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
              <div className='d-none d-sm-block d-xl-none'>
                <Dropdown
                  alignRight
                  dropdownClassName={styles['dropdown']}
                  dropdownToggleClassName={styles['dropdown-toggle']}
                  dropdownMenuClassName={styles['dropdown-menu']}
                  dropdownItems={dropdownItems}
                />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}
