'use client';
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import OuvrageRow from './OuvrageRow';
import AddIcon from '@mui/icons-material/Add';

const OuvrageTable = ({ ouvrages, filteredOuvrages, search, handleSearch, handleOpenModal, handleEditOuvrage, handleDeleteOuvrage }) => {
  return (
    <DashboardCard title="Liste des ouvrages">
      <Box sx={{ overflow: 'auto', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null)}
          startIcon={<AddIcon />}
          sx={{ marginBottom: '1rem' }}
        >
          Ajouter un nouvel ouvrage
        </Button>
        <TextField
          label="Rechercher"
          value={search}
          onChange={handleSearch}
          fullWidth
          margin="normal"
        />
        <Table aria-label="liste des ouvrages" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Titre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Auteur
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Maison d'édition
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Année
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Exemplaire
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Opérations
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOuvrages.map((ouvrage) => (
              <OuvrageRow
                key={ouvrage._id}
                ouvrage={ouvrage}
                handleEdit={handleEditOuvrage}
                handleDelete={handleDeleteOuvrage}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default OuvrageTable;
