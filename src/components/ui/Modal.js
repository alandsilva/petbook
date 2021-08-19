import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Backdrop = ({ onClose }) => {
  return <div className='backdrop' onClick={onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className='modal'>
      {props.header && (
        <div class='modal-header'>
          <span class='close' onClick={props.onClose}>
            &times;
          </span>
          <h3>{props.header}</h3>
        </div>
      )}
      <div className='content'>{props.children}</div>
      {props.footer && <div class='modal-footer'>{props.footer}</div>}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
