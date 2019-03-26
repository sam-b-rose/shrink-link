import React from 'react'

import {
  ViewerFrame,
  ViewerPasscode
} from '~/containers/Viewer'

import api from '~/services/api'

class ViewerPage extends React.Component {
  state = {
    isValidated: null,
  }
  static async getInitialProps ({ res, query: { s, type } }) {
    const { url, passcode, message } = await api.decodeUrl({ s })
    // Send directly to page if no passcode and URL not expired
    if (!passcode && url && type === 'redirect') res.redirect(url)
    return { targetUrl: url, passcode, message, type }
  }
  static getDerivedStateFromProps({ passcode }, { isValidated }) {
    return (isValidated === null)
      ? { isValidated: passcode === '' }
      : null
  }
  validate = attempt => {
    const { passcode } = this.props
    this.setState(
      { isValidated: passcode === attempt.trim() },
      this.redirect
    )
  }
  redirect = () => {
    const { isValidated } = this.state
    const { targetUrl, type } = this.props
    if (type === 'redirect' && isValidated) {
      window.location.href = targetUrl
    }
  }
  render() {
    const { isValidated } = this.state
    const { targetUrl, passcode, message, type } = this.props
    return (
      <div className="h-100 flex items-center justify-center">
      {
        message
        ? (<div>{ message }</div>)
        : (
           <div>
             { passcode === '' || isValidated
               ? (
                  type === 'frame'
                    ? <ViewerFrame url={targetUrl}/>
                    : 'Redirecting...'
                  )
               : (<ViewerPasscode validate={this.validate} />)
             }
           </div>
         )
      }
      </div>
    )
  }
}

export default ViewerPage
