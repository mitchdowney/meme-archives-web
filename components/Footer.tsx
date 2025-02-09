import { useEffect, useState } from 'react'
import { configText } from '@/lib/constants/configurables'
import styles from '@/styles/components/Footer.module.css'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles['footer']}>
      <p className={styles['disclaimer']}>
        {configText.disclaimer}
      </p>
    </div>
  )
}
