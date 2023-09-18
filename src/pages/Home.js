import React from 'react';
import Presentation from './homePageComponent/presentation';
import CarouselService from './homePageComponent/carouselService';
import ScheduleTable from '../scheduleTable';
import CommentCarousel from './homePageComponent/commentCarousel';
import CommentForm from './homePageComponent/commentForm';
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
  }
`;

const Home = () => {
  return (
    <StyledDiv>

      <Presentation />
      <CarouselService />
      <h2>Commentaires</h2>      
      <CommentCarousel />
      <CommentForm />
      <h2>Nos horaires</h2>
      <ScheduleTable />
    </StyledDiv>
  );
}

export default Home;