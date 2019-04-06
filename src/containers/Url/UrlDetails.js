import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isPast from 'date-fns/is_past'
import ClipboardJS from 'clipboard'

import CopySVG from '~/assets/images/copy.svg'

let clipboard = null
const tooltipClasses = ['tooltipped', 'tooltipped-s', 'tooltipped-no-delay']

class UrlDetails extends React.Component {
  state = {
    baseUrl: ''
  }
  componentDidMount() {
    this.setState({ baseUrl: window.location.href })
    clipboard = new ClipboardJS('.copy')
    clipboard.on('success', function(e) {
      e.trigger.classList.add(...tooltipClasses)
      setTimeout(() => e.trigger.classList.remove(...tooltipClasses), 1500)
    });
  }
  componentWillUnmount() {
    clipboard.destroy()
  }
  copyLink = (type, helperText, link) => (
    <div className="mb4">
      <div className="flex justify-between mb2">
        <span className="f6 fw6 ttu">{type}</span>
        <span className="f7 i">{helperText}</span>
      </div>
      <div className="flex justify-between">
        <a className="link washed-blue" href={link}>{link}</a>
        <button
          className="copy link bn bg-transparent pointer near-white f6"
          aria-label="Copied!"
          onClick={e => e.target.focus()}
          data-clipboard-text={link}>
          Copy <span className="ml2"><CopySVG /></span>
        </button>
      </div>
    </div>
  )

  render() {
    const { baseUrl } = this.state
    const { hash, expires, passcode } = this.props

    const redirectUrl = `${baseUrl}r/${hash}`
    const frameUrl = `${baseUrl}f/${hash}`
    const isExpired = isPast(expires)

    const expiresLabel = !expires
      ? 'Expires'
      : isExpired
        ? 'Expired'
        : 'Expires in';

    const expiresValue = !expires
      ? '\u2014' // em dash
      : `${distanceInWordsToNow(expires)}${ isExpired ? ' ago' : ''}`

    return hash && (
        <div className="mw6 pl3 f4 fw3 lh-copy light-gray">
          <p className="mb4">
            Share your shrinked link.
          </p>
          <div className="mb4 pv3 bb b--white-30">
            { this.copyLink('redirect', 'Go directly to link', redirectUrl) }
            { this.copyLink('frame', 'Hide in an iframe', frameUrl) }
          </div>
          <div className="flex pv3">
            <div className="w-50">
              <div className="f6 fw6 ttu">{ expiresLabel }</div>
              <div>{ expiresValue }</div>
            </div>
            <div className="w-50">
              <div className="f6 fw6 ttu">Passcode</div>
              { passcode
                ? <code className="f6 fw3 light-gray">{ passcode }</code>
                : <span>{ '\u2014' }</span> // em dash
              }
            </div>
          </div>
        </div>
      )
  }
}

export default UrlDetails
