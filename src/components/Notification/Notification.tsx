import React, { ReactNode } from 'react'
import classNames from 'classnames'

import ErrorSVG from '~/assets/svg/error.svg'
import SuccessSVG from '~/assets/svg/success.svg'

const Icons = {
  error: [ErrorSVG, 'light-red'],
  success: [SuccessSVG, 'light-green']
}

interface Props {
  active: boolean
  children: ReactNode
  type?: 'success' | 'error'
  className?: string | object
  style?: object
  onDismiss?: () => void
}

const Notification = (props: Props): JSX.Element => {
  const {
    type = 'success',
    active,
    children,
    className = '',
    style = {},
    onDismiss
  } = props
  const [IconSVG = SuccessSVG, colorClass = 'light-green'] = Icons[type]
  const activeClass = active ? 'o-100' : 'o-0'
  return (
    <div
      className={classNames(
        'flex items-center justify-between ph3 pv2 br2 bg-near-black near-white',
        activeClass,
        className
      )}
      style={{ transition: 'opacity 0.15s ease-in', ...style }}
    >
      <span
        className="flex items-center flex-none mr2"
        role="img"
        aria-label="notification icon"
      >
        <IconSVG className={colorClass} />
      </span>
      <span className="flex-auto">{children}</span>
      {onDismiss && (
        <button
          className="flex-none ml2 p0 bn bg-transparent silver f3 pointer"
          onClick={onDismiss}
        >
          &times;
        </button>
      )}
    </div>
  )
}

export default Notification
