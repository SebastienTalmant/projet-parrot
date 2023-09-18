import React from 'react';
import ContactForm from '../contactForm';
import ScheduleTable from '../scheduleTable';
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
  padding: 8px;
  font-size: 1.2rem;
  margin-top: 72px;
  @media (max-width: 767px) {
    padding: 2px;
    font-size: 1rem;
    margin-top: 80px;
  }
`;

const Contact = () => {
  return (
    <StyledDiv>
      <h3>Pour tout renseignements, n'hésitez pas à nous contacter</h3>
      <ContactForm />
      <h2>Nos horaires</h2>
      <ScheduleTable />
    </StyledDiv>
  );
}

export default Contact;