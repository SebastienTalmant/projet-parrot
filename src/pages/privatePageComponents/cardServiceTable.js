import React from 'react';
import Pagination from "react-js-pagination";
import Button from '../../button';
import styled from 'styled-components';

const StyledTable = styled.table`
  font-family: "Lora", serif;
  width: 100%;
  border-collapse: collapse;
  tr:nth-child(even) {
    background-color: #8D99AE;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const CardServiceTable = ({ data, onEdit, onDelete, onAdd }) => {
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
      <h3>Gestion des services</h3>
      <StyledTable>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <Button primary onClick={() => onEdit(item.id)}>Modifier</Button>
                <Button onClick={() => onDelete(item.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <ControlsContainer>
        <Button primary onClick={onAdd}>Ajouter service</Button>
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

export default CardServiceTable;
