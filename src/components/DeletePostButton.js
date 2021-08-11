import React from 'react';
import { useSelector } from 'react-redux';
import DeletePost from './DeletePost';

const DeletePostButton = ({ postId, userHandle }) => {
  let user = useSelector((state) => state.user);
  const deleteButton =
    user.authenticated && user.credentials.handle === userHandle ? (
      <DeletePost postId={postId} />
    ) : null;
  return deleteButton;
};

export default DeletePostButton;
