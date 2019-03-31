import React from 'react'

import Button from '~/components/Button'
import Input from '~/components/Input'
import NumberInput from '~/components/NumberInput'

import api from '~/services/api'

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
    console.log(name, value)
    this.setState({ [name]: value })
  }
  render() {
    const { url, duration, unit, passcode } = this.state
    return (
      <form onSubmit={this.submit}>
        <div className="mb4">
          <Input
            id="url"
            name="url"
            placeholder="https://website.com"
            labelText="URL"
            helperText="Required. Can't shrink a link without a link"
            type="text"
            value={url}
            onChange={this.onInputChange} />
          <NumberInput
            id="duration"
            name="duration"
            labelText="Duration"
            helperText="Place a time limit on your link"
            value={duration}
            onChange={this.onInputChange}
            unit={unit}
            units={units}
            onUnitChange={this.onInputChange} />
          <Input
            id="passcode"
            name="passcode"
            placeholder="super-secret-passcode"
            labelText="Passcode"
            helperText="Protect your link"
            type="text"
            value={passcode}
            onChange={this.onInputChange} />
        </div>
        <Button type="submit">Shrink</Button>
      </form>
    )
  }
}

export default UrlForm
