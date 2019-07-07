import React, { ReactNode } from 'react'
import classNames from 'classnames'
import './button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  className?: string
  onClick?: () => void
}

const Button = (props: Props): JSX.Element => {
  const { children, className = '', onClick = (): void => {}, ...attr } = props
  return (
    <button
      {...attr}
      className={classNames('button mb2 ph3 pv2 br2 f6 link', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
