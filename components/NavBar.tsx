import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from '@/components/Image'
import FAIcon from './FAIcon'
import Icon from './Icon'

import styles from '@/styles/components/NavBar.module.css'

const navIconSize = 24

type NavLinkIconProps = {
  imageSrc: string
  title: string
  url: string
}

function NavLinkIcon({ imageSrc, title, url }: NavLinkIconProps) {
  return (
    <li className='nav-item'>
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

function NavLinkFAIcon({ icon, title, url }: NavLinkFAIconProps) {
  return (
    <li className='nav-item'>
      <Link
        aria-label={title}
        className={`nav-link ${styles['nav-link-icon']}`}
        href={url}
        rel='noopener noreferrer'
        target='_blank'>
        <FAIcon
          icon={icon}
          title={title}
        />
      </Link>
    </li>
  )
}

export default function NavBar() {
  const pathname = usePathname()

  const isArtGallery = pathname === '/art'
  const isWhitepaper = pathname === '/whitepaper'

  return (
    <nav className={`navbar fixed-top navbar-expand-sm navbar-light bg-light ${styles.navbar}`}>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          <Image
            alt='$PAINT Logo'
            height={48}
            imageSrc='/paint_logo_small_square.png'
            priority
            title='$PAINT Logo'
            width={48}
          />
        </Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto d-flex flex-grow-1'>
            <li className='nav-item'>
              <Link
                className={`nav-link ${styles['nav-link-text']} ${isArtGallery ? 'active' : ''}`}
                {...(isArtGallery ? { 'aria-current': 'page' } : {})}
                href='/art'>
                Gallery
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ${styles['nav-link-text']} ${isWhitepaper ? 'active' : ''}`}
                {...(isWhitepaper ? { 'aria-current': 'page' } : {})}
                href='/whitepaper'>
                Whitepaper
              </Link>
            </li>
            <div className='flex-grow-1' />
            <div className={styles['social-links']}>
              <NavLinkIcon
                imageSrc='/external-sites/birdeye.svg'
                title='Birdeye'
                url='https://birdeye.so/token/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3?chain=solana'
              />
              <NavLinkIcon
                imageSrc='/external-sites/dexscreener.svg'
                title='DEX Screener'
                url='https://dexscreener.com/solana/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3'
              />
              <NavLinkIcon
                imageSrc='/external-sites/dextools.svg'
                title='DEXTools'
                url='https://www.dextools.io/app/en/solana/pair-explorer/NniGZMgEpXL9jTmEATcKMxUbmH5cSNALngJKAQLTXzB'
              />
              <NavLinkIcon
                imageSrc='/external-sites/coingecko.svg'
                title='CoinGecko'
                url='https://www.coingecko.com/en/coins/ms-paint/usd'
              />
              <NavLinkFAIcon
                icon={faXTwitter}
                title='X - Twitter'
                url='https://twitter.com/paintonsol'
              />
              <NavLinkFAIcon
                icon={faTelegram}
                title='Telegram'
                url='https://t.co/OjMn6rdbaU'
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}
