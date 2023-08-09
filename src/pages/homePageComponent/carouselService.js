import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import CardService from './cardService';

const CarouselService = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get('http://localhost:3000/cardservice');
      setCards(response.data);
    };

    fetchCards();
  }, []);

  return (
    <Carousel autoPlay interval={2000} showThumbs={false} infiniteLoop useKeyboardArrows>
      {cards.map(card => (
        <div key={card.id}>
          <CardService card={card} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselService;
