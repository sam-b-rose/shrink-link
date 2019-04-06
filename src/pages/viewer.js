import React from 'react'

import {
  ViewerFrame,
  ViewerPasscode
} from '~/containers/Viewer'

import api from '~/services/api'

class ViewerPage extends React.Component {
  state = {
    targetUrl: '',
    message: '',
    hasPasscode: false
  }
  static async getInitialProps ({ query: { hash, type } }) {
    return { hash, type }
  }
  async componentDidMount() {
    const { hash } = this.props
    const { url, message, hasPasscode } = await api.decodeUrl({ hash })
    this.setState({ targetUrl: url, message, hasPasscode }, this.redirect)
  }
  validate = async passcode => {
    const { hash } = this.props
    const { url, message, hasPasscode } = await api.attemptPasscode({ hash, passcode })
    this.setState({ targetUrl: url, message, hasPasscode }, this.redirect)
  }
  redirect = () => {
    const { type } = this.props
    const { targetUrl } = this.state
    if (targetUrl && type === 'redirect') {
      window.location.href = targetUrl
    }
  }
  render() {
    const { type } = this.props
    const { targetUrl, message, hasPasscode } = this.state
    return (
      <div className="h-100 flex items-center justify-center">
        { message && <div>{message}</div> }
        { hasPasscode && <ViewerPasscode validate={this.validate} /> }
        { targetUrl && type === 'frame' && <ViewerFrame url={targetUrl}/> }
        { targetUrl && type === 'redirect' && 'Redirecting...' }
      </div>
    )
  }
}

export default ViewerPage
