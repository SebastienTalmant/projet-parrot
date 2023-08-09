import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  max-width: 300px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 5px 5px 20px grey;
  height: 500px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardTitle = styled.h3`
  margin: 10px 0;
`;

const CardDescription = styled.p`
  text-align: center;
`;

const CardService = ({ card }) => {
  return (
    <CardContainer>
      <CardImage src={card.image} alt={card.title} />
      <CardTitle>{card.title}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
    </CardContainer>
  );
};

export default CardService;
