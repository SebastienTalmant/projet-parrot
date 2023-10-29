import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CarouselPictures from './carouselPictures';
import Details from './details';
import TabComponent from './tabComponent';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import API_BASE_URL from '../../apiConfig';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 990;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%; 
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const ModalContainer = styled.div`
  background-color: #EDF2F4;
  width: 100vw;
  max-width: 1024px;
  padding: 20px;
  border-radius: 8px;  
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    padding: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.2s;
`;

const AnnonceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [annonce, setAnnonce] = useState(null);

    useEffect(() => {
        const fetchAnnonce = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}annonces/${id}`);
                setAnnonce(response.data);
            } catch (error) {
                console.error("Error fetching annonce details:", error);
            }
        };

        fetchAnnonce();
    }, [id]);

    const handleClose = () => {
        navigate(-1);
    };

    if (!annonce) {
        return <div>Loading...</div>;
    }

    return (
        <ModalOverlay>
            <ModalContainer>
                <HorizontalContainer>
                    <CarouselPictures photos={annonce.photos} />
                    <Details annonce={annonce} />
                </HorizontalContainer>
                <TabComponent annonce={annonce} />
                <CloseButton onClick={handleClose}>X</CloseButton>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default AnnonceDetail;