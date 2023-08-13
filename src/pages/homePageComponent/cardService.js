import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33vw;
  max-width: 341px;
  padding: 20px;
  @media (max-width: 767px) {
    width: 95vw;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 280px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 5px 5px 20px grey;
  height: 530px;
  @media (max-width: 767px) {
    width: 95vw;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardTitle = styled.h3`
  margin: 10px 0;
  font-family: 'Montserrat', sans-serif;
  color: 2B2D42;
`;

const CardDescription = styled.p`
  text-align: center;
`;

const CardService = ({ card }) => {
  return (
    <Card>
            <CardContainer>
        <CardImage src={card.image} alt={card.title} />
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardContainer>
    </Card>
  );
};

export default CardService;
