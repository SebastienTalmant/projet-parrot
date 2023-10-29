import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import styled from 'styled-components';
import axios from 'axios';
import Button from '../../button';
import MessageModal from './messageModal';
import API_BASE_URL from '../../apiConfig';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 100vw;
  max-width: 1024px;
`;

const StyledTable = styled.table`
  font-family: "Lora", serif;
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: ${props => props.statut === 'non-traité' ? '#EF233C' : 'auto'};
  &:nth-child(even) {
    background-color: ${props => props.statut === 'non-traité' ? '#EF233C' : '#8D99AE'};
  }
`;

const MessagesTable = ({ data, onEdit, onDelete, onAdd }) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = messages ? messages.slice(indexOfFirstItem, indexOfLastItem) : [];
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const fetchMessages = async () => {
        const response = await axios.get(`${API_BASE_URL}contact`);
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleOpenMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleTreatedMessage = async (messageId) => {
        await axios.put(`${API_BASE_URL}contact/${messageId}`, { statut: 'traité' });
        const updatedMessages = messages.map(message => message.id === messageId ? { ...message, statut: 'traité' } : message);
        setMessages(updatedMessages);
        fetchMessages();
        handleCloseMessage();
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm("Voulez-vous supprimer ce message ?")) {
        await axios.delete(`${API_BASE_URL}contact/${messageId}`);
        const updatedMessages = messages.filter(message => message.id !== messageId);
        setMessages(updatedMessages);
        fetchMessages();
        }
    };

    return (
        <div>
            <DashboardContainer>
                <h3>Gestion des messages</h3>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Sujet</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.map(message => (
        <TableRow key={message.id} statut={message.statut}>
            <td>{message.sujet}</td>
            <td>{message.statut}</td>
            <td>
                <Button primary onClick={() => handleOpenMessage(message)}>Voir le message</Button>
                <Button onClick={() => handleDeleteMessage(message.id)}>Supprimer</Button>
            </td>
        </TableRow>
    ))}
                    </tbody>
                </StyledTable>


                {messages && (
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={messages.length}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                    />
                )}

                {selectedMessage && (
                    <MessageModal
                        message={selectedMessage}
                        onClose={handleCloseMessage}
                        onTreated={() => handleTreatedMessage(selectedMessage.id)}
                    />
                )}
            </DashboardContainer>

        </div>
    );
};

export default MessagesTable;