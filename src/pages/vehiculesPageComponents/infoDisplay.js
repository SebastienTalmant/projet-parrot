import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #8D99AE;
  margin-top: 10px;
  padding: 5px;
  font-family: "Lora", serif;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  align-items: start;
  width: 99vw;
  max-width: 1012px;
  height:300px;
  overflow-y: scroll;
  padding: 5px;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  margin: 5px;
  font-family: "Lora", serif;
  border: 1px solid #ccc;
`;


const mappedKeys = {
    description: 'Modèle',
    nbplace: 'Nombre de place',
    premiermain: 'Première main',
    prix: 'Prix',
    annee: 'Année',
    puissance: 'Puissance',
    energie: 'Énergie',
    couleur: 'Couleur',
    kilometrage: 'Kilométrage',
    boite: 'Boîte',
    interieur: 'Intérieur'
};


const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  max-width: 1024px;
`;

const TableCell = styled(InfoContainer)`
  flex-basis: calc(33.33% - 5px);
  margin: 10px 5px;
  
  @media (max-width: 768px) {
    flex-basis: 100%;
    margin: 5px 0;
  }
`;


const InfoDisplay = ({ type, data }) => {
    if (type === 'details') {
      const mappedData = Object.entries(data)
        .filter(([key]) => mappedKeys[key])
        .map(([key, value]) => [mappedKeys[key], value]);
  
        const itemsPerRow = window.matchMedia('(max-width: 768px)').matches ? 1 : 3;

        return (
          <div>
            {Array(Math.ceil(mappedData.length / itemsPerRow)).fill().map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array(itemsPerRow).fill().map((_, cellIndex) => {
                  const item = mappedData[rowIndex * itemsPerRow + cellIndex];
                  return item ? (
                    <TableCell key={cellIndex}>
                      <span>{item[0]}</span>
                      <span>{item[1]}</span>
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            ))}
          </div>
        );
      }

    return (
      <OptionsContainer>
        {data.map((option, idx) => (
          <OptionItem key={idx}>{option}</OptionItem>
        ))}
      </OptionsContainer>
    );
  };
  
  
export default InfoDisplay;
