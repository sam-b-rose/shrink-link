import React from 'react'

const Input = props => {
  const { labelText, helperText, id, name, placeholder, type, value, onChange, ...inputProps } = props;
  return (
    <div className="mb3">
      <label htmlFor={id} className="f6 db mb2">
        <span className="fw6 ttu gray">{labelText}</span>
        <span className="fr i black-60">
          {helperText}
        </span>
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        aria-describedby={`${name}-desc`}
        className="input-reset db w-100 mb2 pa2 ba b--black-20 br2"
        value={value}
        onChange={onChange}
        {...inputProps} />
        <style jsx>{`
          input:not([value=""]):invalid {
            border-color: var(--red);
          }
        `}</style>
    </div>
  )
}

export default Input
