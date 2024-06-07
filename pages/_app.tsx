import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import AdminWidget from '@/components/AdminWidget'
import { UserInfo } from '@/lib/types'
import { getUserInfo } from '@/services/admin'

Modal.setAppElement('#__next')

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  useEffect(() => {
    import('bootstrap')
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem('loginAttempted')) {
          const data = await getUserInfo()
          setUserInfo(data)
        }
      } catch (error) {
        //
      }
      setIsUserInfoLoading(false)
    })()
  }, [router.asPath])

  return (
    <Layout>
      {
        userInfo && (
          <AdminWidget/>
        )
      }
      <Component
        {...pageProps}
        isUserInfoLoading={isUserInfoLoading}
        userInfo={userInfo}
      />
    </Layout>
  )
}
