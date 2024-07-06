'use client';
import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeleteConfirmationModal = ({ open, onClose, onConfirm, ouvrageTitle }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirmer la suppression
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Êtes-vous sûr de vouloir supprimer l'ouvrage "{ouvrageTitle}" ?
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Supprimer
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
