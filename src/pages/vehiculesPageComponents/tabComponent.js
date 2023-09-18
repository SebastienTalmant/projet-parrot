import React, { useState } from 'react';
import styled from 'styled-components';
import InfoDisplay from './infoDisplay';

const TabButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  width: 100vw;
  font-size: 1.3rem;
  max-width: 512px;
  font-family: Lora;
  background-color: ${props => props.active ? '#8D99AE' : 'transparent'};
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  margin-top: 50px;
  z-index: 1;
  @media (max-width: 767px) {
  width: 100vw;
  }
`;

const TabComponent = ({ annonce }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div>
      <TabsContainer>
        <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')}>Détails</TabButton>
        <TabButton active={activeTab === 'options'} onClick={() => setActiveTab('options')}>Options/Equipements</TabButton>
      </TabsContainer>
      
      <InfoDisplay type={activeTab} data={activeTab === 'details' ? annonce : annonce.options} />
    </div>
  );
};

export default TabComponent;
