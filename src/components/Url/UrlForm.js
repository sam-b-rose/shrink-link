import React from 'react'
import capitalize from 'lodash/capitalize'

import {
  Form,
  FormGroup,
  Button,
  TextInput,
  NumberInput,
  Select,
  SelectItem
} from 'carbon-components-react'

import api from '../../services/api'

const units = [
  'minutes',
  'days',
  'months',
]

class UrlForm extends React.Component {
  initialState = {
    url: '',
    duration: '',
    unit: units[0],
    passcode: ''
  }
  state = { ...this.initialState }
  reset = () => {
    this.setState({ ...this.initialState })
  }
  submit = async (e) => {
    e.preventDefault()
    const { url, passcode } = this.state
    const payload = this.state
    const data = await api.encodeUrl(payload)
    this.props.onSubmit({ url, passcode, ...data })
    if (!data.message) this.reset()
  }
  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  onNumberChange = ({ imaginaryTarget: { name, value } }) => {
    this.setState({ [name]: +value })
  }
  render() {
    const { url, duration, unit, passcode } = this.state
    return (
      <Form onSubmit={this.submit}>
        <FormGroup legendText="">
          <TextInput
            id="url"
            name="url"
            labelText="URL"
            placeholder="https://website.com"
            type="text"
            value={url}
            onChange={this.onInputChange} />
        </FormGroup>
        <FormGroup legendText="">
          <NumberInput
              id="duration"
              name="duration"
              label="Duration"
              step={1}
              min={0}
              max={100000}
              value={duration}
              invalidText="Duration must be a number"
              onChange={this.onNumberChange} />
        </FormGroup>
        <FormGroup legendText="">
          <Select
            id="unit"
            name="unit"
            labelText="Unit"
            value={unit}
            onChange={this.onInputChange}>
            {
             units.map((u, i) => (
              <SelectItem
                key={i}
                value={u}
                text={capitalize(u)} />
             ))
            }
          </Select>
        </FormGroup>
        <FormGroup legendText="">
          <TextInput
            id="passcode"
            name="passcode"
            labelText="Passcode"
            placeholder="super-secret-passcode"
            type="text"
            value={passcode}
            onChange={this.onInputChange} />
        </FormGroup>
        <Button type="submit">
          Create
        </Button>
      </Form>
    )
  }
}

export default UrlForm
