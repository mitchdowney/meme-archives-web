import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { MouseEventHandler } from 'react'
import FAIcon from './FAIcon'

type Props = {
  as?: 'button' | 'a'
  children: any
  className: string
  download?: string | null
  href?: string
  isLoading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset' | undefined
}

export default function Button({ as, children, className, download, href,
  isLoading, onClick, type }: Props) {
  if (as === 'a') {
    return (
      <a
        className={className}
        download={download}
        href={href}>
        {
          isLoading && (
            <FAIcon 
              className='ps-button'
              icon={faSpinner}
              spin
              title='Loading...'
            />
          )
        }
        {!isLoading && children}
      </a>
    )
  }

  return (
    <button
      className={className}
      disabled={isLoading}
      onClick={onClick}
      type={type}>
      {
        isLoading && (
          <FAIcon 
            className='ps-button'
            icon={faSpinner}
            spin
            title='Loading...'
          />
        )
      }
      {!isLoading && children}
    </button>
  )
}
