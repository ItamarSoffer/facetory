// POPUP PROPS:
// wrapper element!
// onClose (optional): what to do when the popup is closed - function
// popupWidth (optional): width of popup on desktop - string

import React from "react";
import "../../styles/popup.scss";
import { Modal, Backdrop, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export default function Popup(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={props.isShowing}
      onClose={handleClose}
      closeAfterTransition
      disableBackdropClick
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Zoom
        in={props.isShowing}
        onExited={handleClose}
        mountOnEnter
        unmountOnExit
      >
        <div className="popup-body">
          <img src="/my-icons/close.svg" alt="סגירה" className="popup-close-icon" onClick={handleClose}/>
          {props.children}
        </div>
      </Zoom>
    </Modal>
  );
}
