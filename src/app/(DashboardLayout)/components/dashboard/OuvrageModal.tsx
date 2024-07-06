'use client';
import React from 'react';
import { Box, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

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

const OuvrageModal = ({ open, onClose, isEditing, ouvrage, handleChange, handleSave }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEditing ? 'Modifier' : 'Ajouter'} un ouvrage
        </Typography>
        <form noValidate autoComplete="off">
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={ouvrage.type}
              onChange={handleChange('type')}
            >
              <MenuItem value="book">Livre</MenuItem>
              <MenuItem value="periodical">Périodique</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Titre"
            value={ouvrage.title}
            onChange={handleChange('title')}
            fullWidth
            margin="normal"
          />
          {ouvrage.type === 'book' && (
            <>
              <TextField
                label="Auteur"
                value={ouvrage.author}
                onChange={handleChange('author')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Maison d'édition"
                value={ouvrage.edition}
                onChange={handleChange('edition')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Année"
                value={ouvrage.year}
                onChange={handleChange('year')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Exemplaire"
                value={ouvrage.exemplaire}
                onChange={handleChange('exemplaire')}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {ouvrage.type === 'periodical' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Périodicité</InputLabel>
                <Select
                  value={ouvrage.periodicity}
                  onChange={handleChange('periodicity')}
                >
                  <MenuItem value="hebdomadaire">Hebdomadaire</MenuItem>
                  <MenuItem value="mensuel">Mensuel</MenuItem>
                  <MenuItem value="journalier">Journalier</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date de parution"
                type="date"
                value={ouvrage.publicationDate}
                onChange={handleChange('publicationDate')}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Exemplaire"
                value={ouvrage.exemplaire}
                onChange={handleChange('exemplaire')}
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '1rem' }}>
            {isEditing ? 'Modifier' : 'Ajouter'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default OuvrageModal;
