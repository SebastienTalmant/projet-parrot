import React from 'react';
import Pagination from "react-js-pagination";
import Button from '../../button';
import styled, { createGlobalStyle } from 'styled-components';

const StyledTable = styled.table`
  font-family: "Lora", serif;
  width: 100%;
  border-collapse: collapse;
  tr:nth-child(even) {
    background-color: #d2d7df;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const GlobalStyles = createGlobalStyle`
  ul.pagination {
    list-style-type: none;
    display: flex;
    justify-content: center;
    font-family: "Lora", serif;
    color: #2B2D42;
    li {
      margin: 0 5px;
    }
    a {
      color: #2B2D42;
      cursor: pointer;
    }
  }
`;


const AnnonceTable = ({ data, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <GlobalStyles />
      <h3>Gestion des annonces</h3>
      <StyledTable>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.titre}</td>
              <td>{item.user_email}</td>
              <td>
                <Button onClick={() => onDelete(item.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <ControlsContainer>
        <Button primary onClick={onAdd}>Ajouter annonce</Button>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </ControlsContainer>
    </>
  );
};

export default AnnonceTable;
