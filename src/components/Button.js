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
      className={`f6 link dim br2 ph3 pv2 mb2 dib white bg-black pointer ${className}`}
      onClick={onClick}
      { ...remainingProps }>
      {children}
    </button>
  )
}

export default Button
