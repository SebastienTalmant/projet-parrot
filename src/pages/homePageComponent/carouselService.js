import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardService from './cardService';
import Carousel from '../../carousel';
import API_BASE_URL from '../../apiConfig';

const CarouselService = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get(`${API_BASE_URL}cardservice`);
      setCards(response.data);
    };

    fetchCards();
  }, []);

  return (
    <>
      <h2>Nos Services</h2>
      <Carousel>
        {cards.map((card) => (
          <div key={card.id}>
            <CardService card={card} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselService;
