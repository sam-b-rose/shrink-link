import React from 'react'

const Button = props => {
  const {
    children,
    className = '',
    onClick = () => {},
    ...remainingProps
  } = props;
  return (
    <button
      className={`btn mb2 ph3 pv2 br2 f6 link ${className}`}
      onClick={onClick}
      { ...remainingProps }>
      {children}
    </button>
  )
}

export default Button
