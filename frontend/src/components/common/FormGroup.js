import React from 'react'

const FormGroup = (props) => {
    return (
        <div className="form-group">
        <label htmlFor={props.text}>{props.text}</label>
        {props.children}
      </div>
    )
}

export default FormGroup
