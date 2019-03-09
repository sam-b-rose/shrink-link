import React from 'react'

import {
  Form,
  FormGroup,
  Button,
  TextInput,
} from 'carbon-components-react'

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
      <Form onSubmit={this.submit}>
        <FormGroup legendText="">
          <TextInput
            id="attempt"
            name="attempt"
            labelText="Passcode"
            type="text"
            value={attempt}
            onChange={this.onInputChange}
            autoFocus />
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default ViewerPasscode
