import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  helperText?: string
  id: string
  name: string
  placeholder?: string
  type?: string
  value: string | number
  onChange: ({
    target: { name, value }
  }: {
    target: { name: string; value: string }
  }) => void
}

const Input = (props: Props): JSX.Element => {
  const {
    labelText,
    helperText,
    id,
    name,
    placeholder,
    type = 'text',
    value,
    onChange,
    ...attr
  } = props
  return (
    <div className="mb3">
      <label htmlFor={id} className="f6 db mb2">
        <span className="fw6 ttu gray">{labelText}</span>
        <span className="db-l dn fr i black-60">{helperText}</span>
      </label>
      <input
        {...attr}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        aria-describedby={`${name}-desc`}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className="input-reset db w-100 mb2 pa2 ba b--black-20 br2"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
