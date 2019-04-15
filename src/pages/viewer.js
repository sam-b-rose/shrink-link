import React from 'react'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Frame from '~/components/Frame'
import api from '~/services/api'

class ViewerPage extends React.Component {
  state = {
    attempt: '',
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
  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  validate = async (e) => {
    e.preventDefault()
    const { hash } = this.props
    const { attempt: passcode } = this.state
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
  renderPasscodeForm = () => (
    <form onSubmit={this.validate}>
      <Input
        id="attempt"
        name="attempt"
        labelText="Passcode"
        type="text"
        required
        value={this.state.attempt}
        onChange={this.onInputChange} />
      <Button type="submit">Submit</Button>
    </form>
  )
  render() {
    const { type } = this.props
    const { targetUrl, message, hasPasscode } = this.state
    return (
      <div className="h-100 flex items-center justify-center">
        { message && <div>{message}</div> }
        { hasPasscode && this.renderPasscodeForm() }
        { targetUrl && type === 'frame' && <Frame url={targetUrl}/> }
        { targetUrl && type === 'redirect' && 'Redirecting...' }
      </div>
    )
  }
}

export default ViewerPage
