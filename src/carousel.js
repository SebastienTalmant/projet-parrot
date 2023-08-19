import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 550px;
`;

const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s;
  transform: translateX(-${(props) => props.currentSlide * props.slideWidth}%);
`;

const Slide = styled.div`
  transition: all 0.5s;
  height: auto;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    width: 33.33%;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  z-index: 10;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
`;

const Carousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  const slidesToScroll = 1;
  const slideWidth = window.innerWidth >= 768 ? 33.33 : 100;

  const nextSlide = () => {
    if (window.innerWidth >= 768 && currentSlide < totalSlides - slidesToScroll * 3) {
      setCurrentSlide(currentSlide + slidesToScroll);
    } else if (window.innerWidth < 768 && currentSlide < totalSlides - slidesToScroll) {
      setCurrentSlide(currentSlide + slidesToScroll);
    }
    else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - slidesToScroll);
    } else {
      if (window.innerWidth >= 768) {
        setCurrentSlide(totalSlides - slidesToScroll * 3);
      } else {
        setCurrentSlide(totalSlides - slidesToScroll);
      }

    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);


  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const difference = startX - touchX;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <CarouselContainer onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <SlideWrapper currentSlide={currentSlide} slideWidth={slideWidth}>
        {React.Children.map(children, child => (
          <Slide>{child}</Slide>
        ))}
      </SlideWrapper>
      <PrevButton onClick={prevSlide}><FaArrowLeft /></PrevButton>
      <NextButton onClick={nextSlide}><FaArrowRight /></NextButton>
    </CarouselContainer>
  );
};

export default Carousel;