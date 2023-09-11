import React from 'react';
import AnnoncesList from './vehiculesPageComponents/annoncesList';
import styled from 'styled-components';


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

function Vehicules() {
  return (
    <StyledDiv>
      <h2>Nos Véhicules</h2>
      <AnnoncesList />
    </StyledDiv>
      );
}

      export default Vehicules;
