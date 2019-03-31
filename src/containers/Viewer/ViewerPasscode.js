import React from 'react'

import Button from '~/components/Button'
import Input from '~/components/Input'

class ViewerPasscode extends React.Component {
  state = {
    attempt: ''
  }
  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  submit = (e) => {
    e.preventDefault()
    const { attempt } = this.state
    const { validate } = this.props
    validate(attempt)
  }
  render() {
    const { attempt } = this.state
    return (
      <form onSubmit={this.submit}>
        <Input
          id="attempt"
          name="attempt"
          labelText="Passcode"
          type="text"
          value={attempt}
          onChange={this.onInputChange} />
        <Button>Submit</Button>
      </form>
    )
  }
}

export default ViewerPasscode
