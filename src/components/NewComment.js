import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import RateReviewIcon from '@material-ui/icons/RateReview';
import useField from '../hooks/useField';
import axios from 'axios';

import CommentInput from './CommentInput';

import { createComment } from '../redux/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  acordion: {
    border: 'none',
    boxshadow: 'none',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const NewComment = ({ postId }) => {
  const classes = useStyles();
  const comment = useField('text', 'Comment');
  let dispatch = useDispatch();
  let post = useSelector((state) => state.data.post);

  const handleCreateComment = () => {
    dispatch(createComment(post.postId, { body: comment.value }));
  };

  return (
    <div className={classes.root}>
      <Accordion elevation={0} className={classes.accordion}>
        <AccordionSummary
          expandIcon={<RateReviewIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Add a Comment...</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentInput
            comment={comment}
            handleCreateComment={handleCreateComment}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default NewComment;
