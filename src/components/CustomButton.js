import { IconButton, Tooltip } from '@material-ui/core';

const CustomButton = (props) => {
  return (
    <Tooltip title={props.title} placement={props.placement}>
      <IconButton onClick={props.onClick} className='button'>
        {props.children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomButton;
