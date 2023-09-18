import React from 'react';
import ContactForm from '../../contactForm';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  height: 450px;
  width: 40vw;
  max-width: 450px;
  background-color: #EDF2F4;
  padding: 20px;
  @media (max-width: 767px) {
    width: 1000vw;
    padding: 0;
    margin-bottom: 50px;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: 'Montserrat', serif;
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.div`
  font-size: 1.7rem;
  font-family: 'Montserrat', serif;
  font-weight: bold;
  margin-top: 5px;
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-family: 'Lora', serif;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Details = ({ annonce }) => {
    return (
        <DetailsContainer>
            <Title>{annonce.titre}</Title>
            <Description>{annonce.description}</Description>
            <Price>{annonce.prix} €</Price>
            <p>N'hésitez pas à nous contacter pour plus de renseignements</p>
            <ContactForm showSubject={false} defaultSubject={annonce.titre} />
        </DetailsContainer>
    );
};

export default Details;
