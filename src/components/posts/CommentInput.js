import React, { useState } from 'react';

import classes from './CommentInput.module.css';

const CommentInput = ({ comment, handleCreateComment }) => {
  return (
    <div className={classes.container}>
      <textarea
        className={classes.input}
        {...comment}
        rows='4'
        placeholder='Enter comment'
      />
      <button className={classes.button} onClick={handleCreateComment}>
        submit <i class='far fa-paper-plane'></i>
      </button>
    </div>
  );
};

export default CommentInput;
