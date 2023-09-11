import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardAnnonce from './cardAnnonce';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

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
    align-items: center;
    margin-bottom: 20px;
`;

const SliderLabel = styled.span`
    margin-right: 10px;
`;

const AnnoncesList = () => {
    const [annonces, setAnnonces] = useState([]);
    const [filters, setFilters] = useState({
        prix: [0, 0], 
        annee: [0, 0], 
        kilometrage: [0, 0]
    });

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await axios.get('http://localhost:3000/annonces/summaries');
                setAnnonces(response.data);
            } catch (error) {
                console.error("Error fetching annonces:", error);
            }
        };

        fetchAnnonces();

        const fetchFilters = async () => {
            try {
                const response = await axios.get('http://localhost:3000/annonces/filters');
                const data = response.data;
                setFilters({
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
        setFilters(prev => ({ ...prev, [field]: values }));
    };

    return (
        <div>
           <FilterSliderContainer>
              <SliderLabel>Prix: {filters.prix[0]} - {filters.prix[1]}</SliderLabel>
              <ReactSlider
                 value={filters.prix}
                 onChange={values => handleSliderChange('prix', values)}
                 min={filters.prix[0]}
                 max={filters.prix[1]}
              />
           </FilterSliderContainer>
  
           <FilterSliderContainer>
              <SliderLabel>Année: {filters.annee[0]} - {filters.annee[1]}</SliderLabel>
              <ReactSlider
                 value={filters.annee}
                 onChange={values => handleSliderChange('annee', values)}
                 min={filters.annee[0]}
                 max={filters.annee[1]}
              />
           </FilterSliderContainer>
  
           <FilterSliderContainer>
              <SliderLabel>Kilométrage: {filters.kilometrage[0]} - {filters.kilometrage[1]}</SliderLabel>
              <ReactSlider
                 value={filters.kilometrage}
                 onChange={values => handleSliderChange('kilometrage', values)}
                 min={filters.kilometrage[0]}
                 max={filters.kilometrage[1]}
              />
           </FilterSliderContainer>
  
           <AnnoncesGrid>
              {annonces.map(annonce => (
                 <CardAnnonce key={annonce.id} annonce={annonce} />
              ))}
           </AnnoncesGrid>
        </div>
     );
  };

export default AnnoncesList;
