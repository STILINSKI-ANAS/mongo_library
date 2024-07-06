'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import OuvrageTable from './OuvrageTable';
import OuvrageModal from './OuvrageModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import BookStatistics from './BookStatistics';
import { v4 as uuidv4 } from 'uuid';

const OuvrageList = () => {
  const [ouvrages, setOuvrages] = useState([]);
  const [filteredOuvrages, setFilteredOuvrages] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOuvrage, setCurrentOuvrage] = useState({
    _id: '',
    title: '',
    author: '',
    edition: '',
    year: '',
    type: 'book',
    periodicity: '',
    publicationDate: '',
    exemplaire: '',
    created_at: '',
    modified_at: ''
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ouvrageToDelete, setOuvrageToDelete] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchOuvrages();
    fetchStatistics();
  }, []);

  const fetchOuvrages = async (searchQuery = '') => {
    const response = await fetch(`/api/ouvrages?search=${searchQuery}`, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
    const data = await response.json();
    setOuvrages(data);
    setFilteredOuvrages(data);
  };

  const fetchStatistics = async () => {
    const response = await fetch('/api/statistics');
    const data = await response.json();
    setStatistics(data);
  };

  const handleOpenModal = (ouvrage = null) => {
    if (ouvrage) {
      setCurrentOuvrage(ouvrage);
      setIsEditing(true);
    } else {
      setCurrentOuvrage({
        _id: '',
        title: '',
        author: '',
        edition: '',
        year: '',
        type: 'book',
        periodicity: '',
        publicationDate: '',
        exemplaire: '',
        created_at: '',
        modified_at: ''
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (field) => (event) => {
    setCurrentOuvrage({ ...currentOuvrage, [field]: event.target.value });
  };

  const handleSave = async () => {
    const ouvrageToSave = { ...currentOuvrage };
    if (ouvrageToSave.type === 'book') {
      delete ouvrageToSave.periodicity;
      delete ouvrageToSave.publicationDate;
    } else if (ouvrageToSave.type === 'periodical') {
      delete ouvrageToSave.author;
      delete ouvrageToSave.edition;
      delete ouvrageToSave.year;
    }

    if (isEditing) {
      await fetch(`/api/ouvrages/${currentOuvrage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ouvrageToSave),
      });
    } else {
      ouvrageToSave._id = uuidv4(); // Generate a random ID before creating a new ouvrage
      await fetch('/api/ouvrages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ouvrageToSave),
      });
    }
    fetchOuvrages();
    fetchStatistics();
    handleCloseModal();
  };

  const handleDeleteOuvrage = (ouvrage) => {
    setOuvrageToDelete(ouvrage);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await fetch(`/api/ouvrages/${ouvrageToDelete._id}`, {
      method: 'DELETE',
    });
    fetchOuvrages();
    fetchStatistics();
    setDeleteModalOpen(false);
    setOuvrageToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setOuvrageToDelete(null);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    fetchOuvrages(searchQuery);
  };

  const handleSeedData = async () => {
    await fetch('/api/ouvrages/seed', {
      method: 'GET',
    });
    fetchOuvrages();
    fetchStatistics();
  };

  return (
    <>
      {statistics ? <BookStatistics statistics={statistics} /> : <div>Loading...</div>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSeedData}
        startIcon={<AddIcon />}
        sx={{ marginBottom: '1rem' }}
      >
        Insert Dummy Data
      </Button>
      <OuvrageTable
        ouvrages={ouvrages}
        filteredOuvrages={filteredOuvrages}
        search={search}
        handleSearch={handleSearch}
        handleOpenModal={handleOpenModal}
        handleEditOuvrage={handleOpenModal}
        handleDeleteOuvrage={handleDeleteOuvrage}
      />
      <OuvrageModal
        open={modalOpen}
        onClose={handleCloseModal}
        isEditing={isEditing}
        ouvrage={currentOuvrage}
        handleChange={handleChange}
        handleSave={handleSave}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        ouvrageTitle={ouvrageToDelete?.title}
      />
    </>
  );
};

export default OuvrageList;
