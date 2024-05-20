import { configText } from '@/lib/constants/configurables'
import styles from '@/styles/components/Footer.module.css'

export default function Footer() {
  return (
    <div className={styles['footer']}>
      <p className={styles['disclaimer']}>
        {configText.disclaimer}
      </p>
    </div>
  )
}
