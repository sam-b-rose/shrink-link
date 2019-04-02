import React from 'react'
import capitalize from 'lodash/capitalize'

const NumberInput = props => {
  const {
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
    ...rest
  } = props;
  return (
    <div className="mb3">
      <label htmlFor={id} className="f6 db mb2">
        <span className="fw6 ttu gray">{labelText}</span>
        <span className="fr i black-60">
          {helperText}
        </span>
      </label>
      <div className="w-100 mb2">
        <div className="dib w-25 pr2">
          <input
            id={id}
            name={name}
            type="number"
            aria-describedby={`${name}-desc`}
            className="input-reset w-100 pa2 ba b--black-20 br2"
            value={value}
            onChange={onChange}
            {...rest} />
        </div>
        <div className="dib w-75">
          {
            units ? (
              <select
                id="unit"
                name="unit"
                className="input-reset w-100 pa2 ba b--black-20 br2 bg-white"
                value={unit}
                onChange={onUnitChange}
                onBlur={onUnitChange}>
                {
                  units.map((u, i) => (
                  <option key={i} value={u}>{capitalize(u)}</option>
                  ))
                }
              </select>
            ) : null
          }
        </div>
      </div>
      <style jsx>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
            appearance: none;
            margin: 0;
        }
      `}</style>
    </div>
  )
}

export default NumberInput
