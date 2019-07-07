import React, { ReactNode, ChangeEvent, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import capitalize from 'lodash/capitalize'

import '../Input/input.css'
import './unit-input.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  // text props
  labelText?: string
  helperText?: string
  // number input props
  id: string
  name: string
  value: number
  onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
  // select input props
  unit?: string
  units?: string[]
  onUnitChange?: ({ target }: ChangeEvent<HTMLSelectElement>) => void
}

const UnitInput = (props: Props): JSX.Element => {
  const {
    className,
    // text props
    labelText,
    helperText,
    // number input props
    id,
    name,
    value,
    onChange,
    // select input props
    unit,
    units,
    onUnitChange,
    ...attr
  } = props
  return (
    <div {...attr} className={classNames('mb3', className)}>
      {labelText && (
        <label htmlFor={id} className="f6 db mb2">
          <span className="fw6 ttu gray">{labelText}</span>
          {helperText && (
            <span className="db-l dn fr i black-60">{helperText}</span>
          )}
        </label>
      )}
      <div className="w-100 mb2">
        <div className="dib w-25 pr2">
          <input
            {...attr}
            id={id}
            name={name}
            type="number"
            aria-describedby={`${name}-desc`}
            className="input-reset w-100 pa2 ba b--black-20 br2"
            value={value}
            onChange={onChange}
          />
        </div>
        {units && unit && onUnitChange && (
          <div className="dib w-75">
            <select
              id="unit"
              name="unit"
              className="input-reset w-100 pa2 ba b--black-20 br2 bg-white"
              value={unit}
              onChange={onUnitChange}
              onBlur={onUnitChange}
            >
              {units.map(
                (u, i): ReactNode => (
                  <option key={i} value={u}>
                    {capitalize(u)}
                  </option>
                )
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnitInput
