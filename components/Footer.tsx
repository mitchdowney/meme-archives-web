import { configText } from '@/lib/constants/configurableText'
import styles from '@/styles/components/Footer.module.css'

export default function Footer() {
  return (
    <div className={styles['footer']}>
      <p className={styles['disclaimer']}>
        {configText.text.disclaimer}
      </p>
    </div>
  )
}
