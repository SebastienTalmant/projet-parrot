import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardAnnonce from './cardAnnonce';
import ReactSlider from 'react-slider';
import styled from 'styled-components';
import API_BASE_URL from '../../apiConfig';

const AnnoncesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;

    @media (max-width: 767px) { 
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 992px) { 
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FilterSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    margin-bottom: 20px;
    @media (max-width: 767px) { 
        width: 90vw;
    }
`;

const SliderLabel = styled.span`
    margin-right: 10px;
`;

const StyledSlider = styled(ReactSlider)`
    width: 30%;
    height: 20px;
    background: #8D99AE;
    border-radius: 50px;
    outline: none;
    @media (max-width: 767px) { 
        width: 90%;
    }

    .thumb {
        width: 20px;
        height: 20px;
        background: #2B2D42;
        border-radius: 50%;
        cursor: pointer;
        outline: none;
    }

    .track {
        top: 12px;
        background: #2B2D42;
    }

    .active {
        background: #2B2D42;
    }
`;


const AnnoncesList = () => {
    const [annonces, setAnnonces] = useState([]);
    const [globalFilters, setGlobalFilters] = useState({
        prix: [0, 0],
        annee: [0, 0],
        kilometrage: [0, 0]
    });
    const [userFilters, setUserFilters] = useState({
        prix: [0, 0],
        annee: [0, 0],
        kilometrage: [0, 0]
    });

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}annonces/summaries`);
                setAnnonces(response.data);
            } catch (error) {
                console.error("Error fetching annonces:", error);
            }
        };

        fetchAnnonces();

        const fetchFilters = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}annonces/filters`);
                const data = response.data;
                setGlobalFilters({
                    prix: [data.minPrix, data.maxPrix],
                    annee: [data.minAnnee, data.maxAnnee],
                    kilometrage: [data.minKilometrage, data.maxKilometrage]
                });
                setUserFilters({
                    prix: [data.minPrix, data.maxPrix],
                    annee: [data.minAnnee, data.maxAnnee],
                    kilometrage: [data.minKilometrage, data.maxKilometrage]
                });
            } catch (error) {
                console.error("Error fetching filters:", error);
            }
        };

        fetchFilters();
    }, []);

    const handleSliderChange = (field, values) => {
        setUserFilters(prev => ({ ...prev, [field]: values }));
    };

    const annoncesFiltrees = annonces.filter(annonce =>
        annonce.prix >= userFilters.prix[0] &&
        annonce.prix <= userFilters.prix[1] &&
        annonce.annee >= userFilters.annee[0] &&
        annonce.annee <= userFilters.annee[1] &&
        annonce.kilometrage >= userFilters.kilometrage[0] &&
        annonce.kilometrage <= userFilters.kilometrage[1]
    );

    return (
        <div>
            <FilterSliderContainer>
                <SliderLabel>Prix: {userFilters.prix[0]} - {userFilters.prix[1]}</SliderLabel>
                <StyledSlider
                    value={userFilters.prix}
                    onChange={values => handleSliderChange('prix', values)}
                    min={globalFilters.prix[0]}
                    max={globalFilters.prix[1]}
                />
            </FilterSliderContainer>

            <FilterSliderContainer>
                <SliderLabel>Année: {userFilters.annee[0]} - {userFilters.annee[1]}</SliderLabel>
                <StyledSlider
                    value={userFilters.annee}
                    onChange={values => handleSliderChange('annee', values)}
                    min={globalFilters.annee[0]}
                    max={globalFilters.annee[1]}
                />
            </FilterSliderContainer>

            <FilterSliderContainer>
                <SliderLabel>Kilométrage: {userFilters.kilometrage[0]} - {userFilters.kilometrage[1]}</SliderLabel>
                <StyledSlider
                    value={userFilters.kilometrage}
                    onChange={values => handleSliderChange('kilometrage', values)}
                    min={globalFilters.kilometrage[0]}
                    max={globalFilters.kilometrage[1]}
                />
            </FilterSliderContainer>

            <AnnoncesGrid>
                {annoncesFiltrees.map(annonce => (
                    <CardAnnonce key={annonce.id} annonce={annonce} />
                ))}
            </AnnoncesGrid>
        </div>
    );
};

export default AnnoncesList;
