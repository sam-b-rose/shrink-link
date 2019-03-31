import React from 'react'

const Button = props => {
  const {
    children,
    className = '',
    onClick = () => {},
    ...remainingProps
  } = props;
  const base = 'dib link mb2 ph3 pv2 br2 bn bg-blue white f6 pointer shadow-button'
  const hover = 'dim'
  return (
    <button
      className={`${base} ${hover} ${className}`}
      onClick={onClick}
      { ...remainingProps }>
      {children}
    </button>
  )
}

export default Button
