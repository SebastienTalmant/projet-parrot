import React from 'react';
import Presentation from './homePageComponent/presentation';
import CarouselService from './homePageComponent/carouselService';
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
  @media (min-width: 768px) {
    padding: 8px;
    font-size: 1.2rem;
    margin-top: 72px;
  }

  @media (max-width: 767px) {
    padding: 2px;
    font-size: 1rem;
  }
`;

const Home = () => {
    return (
        <StyledDiv>
            
            <Presentation />
            <CarouselService />
            
        </StyledDiv>
    );
}

export default Home;