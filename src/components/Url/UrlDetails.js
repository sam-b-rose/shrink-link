import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isPast from 'date-fns/is_past'

import {
  CodeSnippet,
  Link
} from 'carbon-components-react';

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
          <p className="bx--label">
            { isExpired ? 'Expired' : 'Expires in' }
          </p>
          <h1 className="pb3">
            { `${distanceInWordsToNow(expires)}${ isExpired ? ' ago' : '' }` }
          </h1>
          <ul className="bx--type-body-short-02">
            <li><span className="dib w4">Redirect</span><Link href={redirectUrl}>{redirectUrl}</Link></li>
            <li><span className="dib w4">Frame</span><Link href={frameUrl}>{frameUrl}</Link></li>
            { passcode
                ? (
                  <li>
                    <span className="dib w4">Passcode</span>
                    <CodeSnippet type="inline" feedback="Passcode copied" copyLabel="Copy passcode">{passcode}</CodeSnippet>
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
          <p className="ph1 bx--label">or select one from your URL history</p>
        </div>
      )
  }
}

export default UrlDetails
