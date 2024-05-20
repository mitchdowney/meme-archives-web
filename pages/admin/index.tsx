import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Admin.module.css'
import { UserInfo } from '@/lib/types'
import { configPageText, configSocials, pageRules } from '@/lib/constants/configurables'

type Props = {
  isUserInfoLoading: boolean
  userInfo: UserInfo
}

export const getServerSideProps = async () => {
  if (!pageRules.admin) {
    return {
      notFound: true
    }
  }

  return { props: {} }
}

export default function Admin({ isUserInfoLoading, userInfo }: Props) {
  const metaTitle = configPageText.admin.metaTitle
  const metaDescription = configPageText.admin.metaDescription

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={configSocials.twitterHandle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/logo-preview.png`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/logo-preview.png`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className='centered-column-grid'>
        <div className='row mb-5 flex-column text-center'>
          <h3 className={styles['header-text']}>Admin Panel</h3>
          {
            !userInfo && !isUserInfoLoading && (
              <button
                className={`btn btn-primary ${styles['btn']}`}
                onClick={handleLogin}
                type='button'>
                Log In
              </button>
            )
          }
          {
            (userInfo || !!isUserInfoLoading) && (
              <>
                <Link
                  className={`btn btn-success ${styles['btn']}`}
                  href='/admin/upload-image'>
                  Upload Image
                </Link>
                <Link
                  className={`btn btn-primary ${styles['btn']}`}
                  href='/admin/update-artist'>
                  Update Artist
                </Link>
                <Link
                  className={`btn btn-outline-success ${styles['btn']}`}
                  href='/admin/collection'>
                  Create Collection
                </Link>
                <button
                  className={`btn btn-warning ${styles['btn']}`}
                  onClick={handleLogout}
                  type='button'>
                  Log Out
                </button>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

const handleLogin = () => {
  localStorage.setItem('loginAttempted', 'true')
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`
}

const handleLogout = () => {
  localStorage.setItem('loginAttempted', 'true')
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`
}
