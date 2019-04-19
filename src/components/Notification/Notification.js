import React from 'react'
import ErrorSVG from '~/assets/svg/error.svg'
import SuccessSVG from '~/assets/svg/success.svg'

const Icons = {
  error: [ErrorSVG, 'light-red'],
  success: [SuccessSVG, 'light-green']
}

const Notification = (props) => {
  const { type='success', active, onDismiss, children, className='', style={} } = props
  const [
    IconSVG=SuccessSVG,
    colorClass='light-green'
  ] = Icons[type]
  const activeClass = active ? 'o-100' : 'o-0'
  return (
    <div
      className={`flex items-center justify-between ph3 pv2 br2 bg-near-black near-white ${activeClass} ${className}`}
      style={{ transition: 'opacity 0.15s ease-in', ...style }}>
      <span className="flex items-center flex-none mr2" role="img" aria-label="notification icon">
        <IconSVG className={colorClass} />
      </span>
      <span className="flex-auto">{ children }</span>
      { onDismiss && <button className="flex-none ml2 p0 bn bg-transparent silver f3 pointer" onClick={onDismiss}>&times;</button> }
    </div>
  )
}

export default Notification
