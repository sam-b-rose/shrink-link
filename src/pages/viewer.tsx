import React from 'react'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Frame from '~/components/Frame'
import Notification from '~/components/Notification'
import { attemptPasscode, decodeUrl } from '~/services/api'

interface Props {
  hash: string
  type: string
}

interface State {
  attempt: string
  targetUrl: string
  message: string
  hasPasscode: boolean
  showNotification: boolean
}

class ViewerPage extends React.Component<Props, State> {
  public state = {
    attempt: '',
    targetUrl: '',
    message: '',
    hasPasscode: false,
    showNotification: false
  }
  public static async getInitialProps({
    query: { hash, type }
  }): Promise<{ hash: string; type: string }> {
    return { hash, type }
  }
  public async componentDidMount(): Promise<void> {
    const { hash } = this.props
    const { url, message, hasPasscode } = await decodeUrl({ hash })
    this.setState({ targetUrl: url, message, hasPasscode }, this.redirect)
  }
  private onInputChange = ({ target: { name, value } }): void => {
    //@ts-ignore
    this.setState({ [name]: value, showNotification: false })
  }
  private validate = async (e): Promise<void> => {
    e.preventDefault()
    const { hash } = this.props
    const { attempt: passcode } = this.state
    const { url, message, hasPasscode } = await attemptPasscode({
      hash,
      passcode
    })
    this.setState(
      {
        message,
        hasPasscode,
        targetUrl: url,
        showNotification: !url
      },
      this.redirect
    )
  }
  private redirect = (): void => {
    const { type } = this.props
    const { targetUrl } = this.state
    if (targetUrl && type === 'redirect') {
      window.location.href = targetUrl
    }
  }
  private renderPasscodeForm = (): JSX.Element => (
    <form className="relative" onSubmit={this.validate}>
      <Notification
        className="absolute top-0 left-0 right-0"
        style={{ transform: 'translateY(calc(-100% - 1rem))' }}
        type="error"
        active={this.state.showNotification}
      >
        Incorrect
      </Notification>
      <Input
        id="attempt"
        name="attempt"
        labelText="Passcode"
        type="text"
        required
        value={this.state.attempt}
        onChange={this.onInputChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
  public render(): JSX.Element {
    const { type } = this.props
    const { targetUrl, message, hasPasscode } = this.state
    return (
      <div className="h-100 flex items-center justify-center">
        {message && <div>{message}</div>}
        {hasPasscode && this.renderPasscodeForm()}
        {targetUrl && type === 'frame' ? <Frame url={targetUrl} /> : null}
        {targetUrl && type === 'redirect' ? 'Redirecting...' : null}
      </div>
    )
  }
}

export default ViewerPage
