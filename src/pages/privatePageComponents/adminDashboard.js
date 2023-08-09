import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserForm from './userForm';
import Table from './Table';
import Schedule from './schedule';
import axios from 'axios';
import Connection from './AuthConnection';
import CardServiceDashboard from './cardServiceDashboard';

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
    const response = await axios.get('http://localhost:3000/admin');
    setUsers(response.data);
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
      const response = await axios.delete(`http://localhost:3000/admins/${id}`);
      if (response.status === 200) {
        fetchUsers();
        alert('Enregistrement effectué')
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    let response;

    if (formAction === 'add') {
      response = await axios.post('http://localhost:3000/admins', formData);
    } else if (formAction === 'edit') {
      response = await axios.put(`http://localhost:3000/admins/${currentId}`, formData);
    }
    if (response && response.status === 200) {
      setFormAction(null);
      fetchUsers();
      alert('Enregistrement effectué')
    }
  };

  return (<>
  <div>
    <Connection />
  </div>
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
