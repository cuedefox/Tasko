import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function Notification({ open, handleClose, message }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
