import React from 'react';

import classes from './Button.module.css';

const Button = ({ disabled, children }) => {
  return (
    <button className={classes.container} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
