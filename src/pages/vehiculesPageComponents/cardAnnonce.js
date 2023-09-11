import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    border: 1px solid #8D99AE;
    border-radius: 4px;
    padding: 16px;
    margin: 16px 0;
    width: 90%;
    max-width: 250px;
    box-shadow: 5px 5px 10px #8D99AE;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    margin-bottom: 16px;
`;

const Title = styled.h2`
    font-size: 1.25em;
    margin-bottom: 8px;
    color: #2B2D42;
`;

const Description = styled.p`
    color: #2B2D42;
    margin-bottom: 8px;
`;

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    color: #2B2D42;
`;

const Price = styled.span`
    font-weight: bold;
    font-size: 1.5em;
    color: #2B2D42;
`;

const CardAnnonce = ({ annonce }) => {
    return (
        <CardContainer>
            <ImageContainer style={{ backgroundImage: `url(${annonce.photo_url})` }} />
            <Title>{annonce.titre}</Title>
            <Description>{annonce.description}</Description>
            <Details>
                <span>{annonce.kilometrage} km</span>
                <span>{annonce.annee}</span>
            </Details>
            <Price>{annonce.prix} €</Price>
        </CardContainer>
    );
};

export default CardAnnonce;
