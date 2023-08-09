import React, { useState, useEffect } from 'react';
import CardServiceForm from './cardServiceForm';
import CardServiceTable from './cardServiceTable';
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

const CardServiceDashboard = () => {
  const [currentId, setCurrentId] = useState(0);
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await axios.get('http://localhost:3000/cardservice');
    setCards(response.data);
  };

  const handleAdd = () => {
    setCurrentId(0);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce service ?")) {
      const response = await axios.delete(`http://localhost:3000/cardservice/${id}`);
      if (response.status === 200) {
        fetchCards();
        alert('Enregistrement effectué')
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    if (currentId === 0) {
      await axios.post('http://localhost:3000/cardservice', formData);
    } else {
      await axios.put(`http://localhost:3000/cardservice/${currentId}`, formData);
    }
    fetchCards();
    setCurrentId(0);
    setShowForm(false);
  };

  return (
    <DashboardContainer>
      <TableContainer>
        <CardServiceTable data={cards} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
      </TableContainer>
      <FormContainer showForm={showForm}>
        {showForm && (
          <CardServiceForm
            onSubmit={handleFormSubmit}
            initialValues={currentId === 0 ? {} : cards.find(card => card.id === currentId)}
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

export default CardServiceDashboard;

