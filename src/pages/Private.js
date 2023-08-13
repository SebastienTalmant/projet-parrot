import React, { useContext } from 'react';
import Connection from './privatePageComponents/AuthConnection';
import styled from 'styled-components';
import { AuthContext } from './privatePageComponents/AuthContext';
import AdminDashboard from './privatePageComponents/adminDashboard';
import AnnoncesForm from './privatePageComponents/annoncesForm';

const StyledDiv = styled.div`
  background-color: #EDF2F4;
  width: 100vw;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  @media (min-width: 768px) {
    padding: 8px;
    font-size: 1.2rem;
  }
  @media (max-width: 767px) {
    padding: 2px;
    font-size: 1rem;
    margin-top: 72px;
  }
`;

const Private = () => {
  const { isLoggedIn, role } = useContext(AuthContext);

  
  return (
    <StyledDiv>
      {!isLoggedIn ? (
        <Connection />
      ) : role === 'admin' ? (
        <>        
          <AdminDashboard />
          <AnnoncesForm />
        </>

        
      ) : (
        <div> retest </div>
      )}
    </StyledDiv>
  );
};

export default Private;
