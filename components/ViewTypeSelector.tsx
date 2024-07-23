import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons/faTableCellsLarge'
import FAIcon from './FAIcon'
import { faTableCells } from '@fortawesome/free-solid-svg-icons/faTableCells'
import { ViewTypes } from '@/lib/types'
import styles from '@/styles/components/ViewTypeSelector.module.css'
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare'

type Props = {
  handleSelectViewType: (viewType: ViewTypes) => void
  viewTypeSelected: ViewTypes
}

export default function ViewTypeSelector({ handleSelectViewType, viewTypeSelected }: Props) {
  return (
    <div className={styles['view-type-wrapper']}>
      <FAIcon
        buttonWrapperName={styles['view-type-icon-button-wrapper']}
        className={viewTypeSelected === 'large' ? styles['view-type-icon-active'] : styles['view-type-icon']}
        icon={faSquare}
        onClick={() => handleSelectViewType('large')}
        title='Large view'
      />
      <FAIcon
        buttonWrapperName={styles['view-type-icon-button-wrapper']}
        className={viewTypeSelected === 'small' ? styles['view-type-icon-active'] : styles['view-type-icon']}
        icon={faTableCellsLarge}
        onClick={() => handleSelectViewType('small')}
        title='Small view'
      />
      <FAIcon
        buttonWrapperName={styles['view-type-icon-button-wrapper']}
        className={viewTypeSelected === 'tiny' ? styles['view-type-icon-active'] : styles['view-type-icon']}
        icon={faTableCells}
        onClick={() => handleSelectViewType('tiny')}
        title='Tiny view'
      />
    </div>
  )
}