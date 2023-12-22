import React from 'react';
import './input.css'

const Input = (props) => {
  const { fieldName, description, value, onChange, type } = props
  return (
    <>
      <label htmlFor={fieldName}>{description}</label>
      <input
        type={type}
        id={fieldName}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default Input;