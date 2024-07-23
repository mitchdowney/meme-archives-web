import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import styles from '@/styles/components/FAIcon.module.css'

type ExtendedFontAwesomeIconProps = FontAwesomeIconProps & {
  buttonRef?: any
  buttonClassName?: string
  buttonWrapperName?: string
}

export default function FAIcon({ buttonClassName, buttonRef,
  buttonWrapperName, className = '', height, href, icon, onClick,
  spin, tabIndex, target, title, width }: ExtendedFontAwesomeIconProps) {

  const element = (
    <FontAwesomeIcon
      className={className}
      height={height}
      href={href}
      icon={icon}
      spin={spin}
      target={target}
      title={title}
      titleId={title}
      width={width}
    />
  )

  if (onClick) {
    return (
      <div className={buttonWrapperName}>
        <button
          className={`${styles['button']} focus-style ${buttonClassName}`}
          onClick={onClick as any}
          onTouchEnd={onClick as any}
          ref={buttonRef}
          tabIndex={tabIndex}
          type='button'>
          {element}
        </button>
      </div>
    )
  } else {
    return element
  }
}
