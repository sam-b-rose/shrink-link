import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isPast from 'date-fns/is_past'

class UrlDetails extends React.Component {
  state = {
    baseUrl: ''
  }

  componentDidMount() {
    this.setState({ baseUrl: window.location.href })
  }

  render() {
    const { baseUrl } = this.state
    const { s, expires, passcode } = this.props

    const redirectUrl = `${baseUrl}r/${s}`
    const frameUrl = `${baseUrl}f/${s}`
    const FIXED_HEIGHT = '180px'
    const isExpired = isPast(expires)
    return s !== ''
      ? (
        <div style={{ height: FIXED_HEIGHT }}>
          <p>
            { isExpired ? 'Expired' : 'Expires in' }
          </p>
          <h1 className="pb3">
            { `${distanceInWordsToNow(expires)}${ isExpired ? ' ago' : '' }` }
          </h1>
          <ul>
            <li><span className="dib w4">Redirect</span><a href={redirectUrl}>{redirectUrl}</a></li>
            <li><span className="dib w4">Frame</span><a href={frameUrl}>{frameUrl}</a></li>
            { passcode
                ? (
                  <li>
                    <span className="dib w4">Passcode</span>
                    <code type="inline" feedback="Passcode copied" copyLabel="Copy passcode">{passcode}</code>
                  </li>
                )
                : '' }
          </ul>
          <div>
          </div>
        </div>
      )
      : (
        <div style={{ height: FIXED_HEIGHT }}>
          <h1 className="pb2">Create a URL</h1>
          <p className="ph1">or select one from your URL history</p>
        </div>
      )
  }
}

export default UrlDetails
