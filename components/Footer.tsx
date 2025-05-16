import { useEffect, useState } from 'react'
import { configText } from '@/lib/constants/configurables'
import styles from '@/styles/components/Footer.module.css'

export default function Footer() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className={styles['footer']}>
      <p className={styles['disclaimer']}>
        {configText.disclaimer}
      </p>
    </div>
  )
}
