import React from 'react';
import classes from './ActionButton.module.css';

const ActionButton = (props) => {
  const clickEvent = (event) => {
    if (!props.href) {
      event.preventDefault();
    }
    if (props.onClick) {
      props.onClick();
    } else {
      console.log('clicked');
    }
  };
  return (
    <div
      className={classes.container + ' ' + classes[props.color]}
      onClick={clickEvent}
    >
      <i className={props.icon}></i> {props.span && <span>{props.span}</span>}
    </div>
  );
};

export default ActionButton;
