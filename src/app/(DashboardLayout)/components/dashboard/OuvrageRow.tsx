'use client';
import React from 'react';
import { TableCell, TableRow, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OuvrageRow = ({ ouvrage, handleEdit, handleDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
          {ouvrage.title}
        </Typography>
      </TableCell>
      <TableCell>{ouvrage.author}</TableCell>
      <TableCell>{ouvrage.edition}</TableCell>
      <TableCell>{ouvrage.year}</TableCell>
      <TableCell>{ouvrage.type === 'book' ? 'Livre' : 'Périodique'}</TableCell>
      <TableCell>{ouvrage.exemplaire}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(ouvrage)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(ouvrage)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default OuvrageRow;
