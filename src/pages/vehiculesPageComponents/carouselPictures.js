import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const CarouselContainer = styled.div`
  position: relative;
  width: 60vw;
  max-width: 614px;
  height: 550px;
  @media (max-width: 767px) { 
      width: 95vw;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const PreviousButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;


const LightBoxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const FullSizeImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: cover;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 50%;
  font-size: 2rem;
  width: 30px;
  height: 30px;
  text-align: center;
  justify-content: center;
`;

const LightBoxButton = styled(Button)`
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const LightBoxPreviousButton = styled(LightBoxButton)`
  left: 5vw;
`;

const LightBoxNextButton = styled(LightBoxButton)`
  right: 5vw;
`;

const CarouselPictures = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPhotos = photos.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPhotos);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, totalPhotos]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPhotos);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPhotos) % totalPhotos);
  };

  const [showLightBox, setShowLightBox] = useState(false);

  const openLightBox = () => {
    setShowLightBox(true);
  };

  const closeLightBox = () => {
    setShowLightBox(false);
  };

  return (
    <>
      <CarouselContainer>
        <Image src={photos[currentIndex]} alt="Car" onClick={openLightBox} />
        <PreviousButton onClick={handlePrevious}>←</PreviousButton>
        <NextButton onClick={handleNext}>→</NextButton>
      </CarouselContainer>

      {showLightBox && (
        <LightBoxOverlay>
          <FullSizeImage src={photos[currentIndex]} alt="Car in full size" />
          <CloseIcon onClick={closeLightBox}>X</CloseIcon>
          <LightBoxPreviousButton onClick={handlePrevious}>←</LightBoxPreviousButton>
          <LightBoxNextButton onClick={handleNext}>→</LightBoxNextButton>
        </LightBoxOverlay>
      )}
    </>
  );
};

export default CarouselPictures;






