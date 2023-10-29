import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserForm from './userForm';
import Table from './Table';
import Schedule from './schedule';
import axios from 'axios';
import Connection from './AuthConnection';
import CardServiceDashboard from './cardServiceDashboard';
import API_BASE_URL from '../../apiConfig';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const UserFormAndTableContainer = styled.div`
  width: 100vw;
  border: 1px solid grey;
  @media (min-width: 768px) {
    width: 50vw;
    max-width: 512px;
    display: flex;
    flex-direction: column;
  }
`;

const AdminDashboard = () => {
  const [currentId, setCurrentId] = useState(null);
  const [formAction, setFormAction] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}user`);
    const data = Array.isArray(response.data) ? response.data : [response.data];
    setUsers(data);
  };

  const handleAdd = () => {
    setCurrentId(null);
    setFormAction('add');
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setFormAction('edit');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce profil ?")) {
      const response = await axios.delete(`${API_BASE_URL}users/${id}`);
      if (response.status === 200) {
        fetchUsers();
        alert('Enregistrement effectué')
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    let response;
      response = await axios.post(`${API_BASE_URL}users`, formData);
    if (response && response.status === 200) {
      setFormAction(null);
      fetchUsers();
      alert('Enregistrement effectué')
    }
  };

  return (<>
    <Connection />
    <DashboardContainer>
      <UserFormAndTableContainer>
        <Table data={users} handleEdit={handleEdit} handleDelete={handleDelete} handleAdd={handleAdd} />
        {formAction && (
          <UserForm
            action={formAction}
            onSubmit={handleFormSubmit}
            initialValues={formAction === 'edit' ? users.find(user => user.id === currentId) : {}}
            onClose={() => setFormAction(null)}
          />
        )}
      </UserFormAndTableContainer>
      <Schedule />
    </DashboardContainer>
    <CardServiceDashboard />
  </>
  );
};
export default AdminDashboard;
