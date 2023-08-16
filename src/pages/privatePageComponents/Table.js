import React from "react";
import styled, { createGlobalStyle } from 'styled-components';
import Pagination from "react-js-pagination";
import Button from '../../button';

const StyledTable = styled.table`
  font-family: "Lora", serif;
  border-collapse: collapse;

  tr:nth-child(even) {
    background-color: #d2d7df;
  }
`;

const BottomTable = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
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


const Table = ({ data, handleEdit, handleDelete, handleAdd }) => {
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
      <h3>Gestion des utilisateurs</h3>
      <StyledTable>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>
                <Button primary onClick={() => handleEdit(item.id)}>Modifier</Button>
                {item.role !== 'admin' && <Button onClick={() => handleDelete(item.id)}>Supprimer</Button>}
                {item.role === 'admin' && <Button onClick={() => alert('Suppression administrateur impossible')}>Supprimer</Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <BottomTable>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
        <Button primary onClick={() => handleAdd()}>Ajouter utilisateur</Button>
      </BottomTable>
    </>
  );
};

export default Table;

