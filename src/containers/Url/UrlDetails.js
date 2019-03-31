import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isPast from 'date-fns/is_past'

import CopySVG from '~/assets/images/copy.svg'

class UrlDetails extends React.Component {
  state = {
    baseUrl: ''
  }

  componentDidMount() {
    this.setState({ baseUrl: window.location.href })
  }

  copyLink = (type, helperText, link) => (
    <div className="mb4">
      <div className="flex justify-between mb2">
        <span className="f6 fw6 ttu">{type}</span>
        <span className="f7 i">{helperText}</span>
      </div>
      <div className="flex justify-between">
        <a className="link washed-blue" href={link}>{link}</a>
        <button className="link bn bg-transparent pointer near-white f6">
          Copy <span className="ml2"><CopySVG /></span></button>
      </div>
    </div>
  )

  render() {
    const { baseUrl } = this.state
    const { s, expires, passcode } = this.props

    const redirectUrl = `${baseUrl}r/${s}`
    const frameUrl = `${baseUrl}f/${s}`
    const isExpired = isPast(expires)

    return s && (
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
              <div className="f6 fw6 ttu">
                { isExpired ? 'Expired' : 'Expires in' }
              </div>
              <div>{ `${distanceInWordsToNow(expires)}${ isExpired ? ' ago' : ''}`}</div>
            </div>
            {
              passcode && (
                <div className="w-50">
                  <div className="f6 fw6 ttu">Passcode</div>
                  <code className="f6 fw3 light-gray">{ passcode }</code>
                </div>
              )
            }
          </div>
        </div>
      )
  }
}

export default UrlDetails
