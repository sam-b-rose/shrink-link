import React from 'react'
import capitalize from 'lodash/capitalize'

const NumberInput = props => {
  const { labelText, helperText, id, name, value, onChange, unit, units, onUnitChange } = props;
  return (
    <div className="measure">
      <label htmlFor={id} className="f6 db mb2">
        {labelText}
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
            step="1"
            min="0"
            max="100000"
            aria-describedby={`${name}-desc`}
            className="input-reset w-100 pa2 ba b--black-20 br2"
            value={value}
            onChange={onChange} />
        </div>
        <div className="dib w-75">
          {
            units ? (
              <select
                id="unit"
                name="unit"
                className="input-reset w-100 pa2 ba b--black-20 br2"
                value={unit}
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
    </div>
  )
}

export default NumberInput
