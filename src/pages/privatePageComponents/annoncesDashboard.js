import React, { useState, useEffect } from 'react';
import AnnoncesForm from './annoncesForm';
import AnnoncesTable from './annoncesTable';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  display: ${({ showForm }) => showForm ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    width: 50%;
    display: block;
    max-width: 512px;
  }
`;

const AnnoncesDashboard = () => {
  const [currentId, setCurrentId] = useState(0);
  const [annonces, setAnnonces] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    const response = await axios.get('http://localhost:3000/annonces');
    console.log("Data from API:", response.data);
    const data = Array.isArray(response.data) ? response.data : [response.data];
    setAnnonces(data);
  };

  const handleAdd = () => {
    setCurrentId(0);
    setShowForm(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette annonce ?")) {
      const response = await axios.delete(`http://localhost:3000/annonces/${id}`);
      if (response.status === 200) {
        fetchAnnonces();
        alert('Enregistrement effectué')
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    await axios.post('http://localhost:3000/annonces', formData);
    fetchAnnonces();
    setCurrentId(0);
    setShowForm(false);
  };

  return (
    <DashboardContainer>
      <TableContainer>
        <AnnoncesTable data={annonces} onDelete={handleDelete} onAdd={handleAdd} />
      </TableContainer>
      <FormContainer showForm={showForm}>
        {showForm && (
          <AnnoncesForm
            onSubmit={handleFormSubmit}
            initialValues={currentId === 0 ? {} : annonces.find(annonces => annonces.id === currentId)}
            onClose={() => {
              setCurrentId(0);
              setShowForm(false);
            }}
          />
        )}
      </FormContainer>
    </DashboardContainer>
  );
};

export default AnnoncesDashboard;

