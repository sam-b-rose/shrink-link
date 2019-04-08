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
    this.setState({ [name]: value })
  }
  render() {
    const { url, duration, unit, passcode } = this.state
    return (
      <form className="pt2" onSubmit={this.submit}>
        <div className="mb4-l mb2">
          <Input
            id="url"
            name="url"
            placeholder="https://website.com"
            labelText="URL"
            helperText="Required. Can't shrink a link without a link"
            type="url"
            value={url}
            pattern="https?://.+"
            required
            onChange={this.onInputChange} />
          <NumberInput
            id="duration"
            name="duration"
            labelText="Duration"
            helperText="Place a time limit on your link"
            step="1"
            min="0"
            max="100000"
            placeholder="–"
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
