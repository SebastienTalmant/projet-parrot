import React from 'react';
import styled,{ keyframes } from 'styled-components';
import image from '../../pictures/presentation.jpg'; 

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(150px); }
  100% { opacity: 1; transform: translateY(0px); }
`;


const StyledImage = styled.img`
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
`;

const StyledH1 = styled.h1`
  font-family: 'Montserrat', sans-serif;
  animation: ${fadeIn} 1.3s ease-out;
  color: #D80032
`;

const StyledP = styled.p`
  font-family: 'Hind Madurai', serif;
  text-align: justify;
  animation: ${fadeIn} 1.6s ease-out;
`;

const Presentation = () => {
    return (
        <>
            <StyledImage src={image} alt="Garage V. Parrot" />
            <StyledH1>Garage V. Parrot</StyledH1>
            <StyledP>
              Le Garage V. Parrot est dirigé par son propriétaire, M. V. Parrot, qui a plus de 15 ans d'expérience en mécanique automobile.
              Après des années d'expérience dans l'industrie, M. Parrot a décidé d'ouvrir son propre garage il y a 2 ans. Depuis, il s'est engagé à fournir des services de haute qualité à ses clients.
            </StyledP>
        </>
    );
}

export default Presentation;
