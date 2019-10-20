import React, { ReactNode, ChangeEvent, FormEvent } from 'react'

import Button from '~/components/Button'
import Input from '~/components/Input'
import UnitInput from '~/components/UnitInput'
import { encodeUrl } from '~/services/api'

const units = ['minutes', 'days', 'months']

interface State {
  url: string
  duration: number | string
  unit: string
  passcode: string
}

interface Props {
  onSubmit: (data: {
    url: string
    passcode: string
    hash: string
    expires?: number
  }) => void
}

class UrlForm extends React.Component<Props, State> {
  private initialState = {
    url: '',
    duration: '',
    unit: units[0],
    passcode: ''
  }
  public state = { ...this.initialState }
  private reset = (): void => {
    this.setState({ ...this.initialState })
  }
  private submit = async (e: FormEvent): Promise<void> => {
    const formEl = e.target as HTMLFormElement
    e.preventDefault()
    const { url, passcode } = this.state
    const payload = this.state
    const data = await encodeUrl(payload)
    this.props.onSubmit({ url, passcode, ...data })
    this.reset()
    formEl.reset()
    const firstInput = formEl[0] as HTMLInputElement
    firstInput.focus()
  }
  private onInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    //@ts-ignore
    this.setState({ [target.name]: target.value })
  }
  private onSelectChange = ({
    target
  }: ChangeEvent<HTMLSelectElement>): void => {
    //@ts-ignore
    this.setState({ [target.name]: target.value })
  }
  public render(): ReactNode {
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
            onChange={this.onInputChange}
          />
          <UnitInput
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
            onUnitChange={this.onSelectChange}
          />
          <Input
            id="passcode"
            name="passcode"
            placeholder="super-secret-passcode"
            labelText="Passcode"
            helperText="Protect your link"
            type="text"
            value={passcode}
            onChange={this.onInputChange}
          />
        </div>
        <Button type="submit">Shrink</Button>
      </form>
    )
  }
}

export default UrlForm
