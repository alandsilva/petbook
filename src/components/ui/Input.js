import React from 'react';

import './Input.css';

const Input = (props) => {
  return (
    <div class='form-div'>
      <input
        type={props.type}
        onChange={props.onChange}
        className='form-input'
        value={props.value}
        placeholder=' '
      />
      <label className='form-label'>{props.label}</label>
      {props.error && <p className='input-error'>{props.error}</p>}
    </div>
  );
};

export default Input;
