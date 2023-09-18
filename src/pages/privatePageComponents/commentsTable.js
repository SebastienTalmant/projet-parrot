import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import styled from 'styled-components';
import axios from 'axios';
import Button from '../../button';
import CommentModal from './commentModal';

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
  background-color: ${props => props.approved ? 'auto' : '#EF233C'};
  &:nth-child(even) {
    background-color: ${props => props.approved ? '#8D99AE' : '#EF233C'};
  }
`;


const CommentsTable = ({ data, onEdit, onDelete, onAdd }) => {
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = comments ? comments.slice(indexOfFirstItem, indexOfLastItem) : [];
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };
    
    const fetchComments = async () => {
        const response = await axios.get('http://localhost:3000/comments');
        const sortedData = response.data.sort((a, b) => new Date(b.reception_date) - new Date(a.reception_date));
        setComments(sortedData);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleOpenComment = (comment) => {
        setSelectedComment(comment);
    };

    const handleCloseComment = () => {
        setSelectedComment(null);
    };

    const handleTreatedComment = async (commentId, answer) => {
        await axios.put(`http://localhost:3000/comments/${commentId}`, { approved: true, answer: answer });
        const updatedComments = comments.map(comment => comment.id === commentId ? { ...comment, approved: true, answer: answer } : comment);
        setComments(updatedComments);
        fetchComments();
        handleCloseComment();
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
            await axios.delete(`http://localhost:3000/comments/${commentId}`);
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
            fetchComments();
        }
    };

    return (
        <div>
            <DashboardContainer>
                <h3>Gestion des commentaires</h3>
                <StyledTable>
                <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(comment => (
                            <TableRow key={comment.id} approved={comment.approved}>
                                <td>{comment.name}</td>
                                <td>{comment.approved ? 'validé' : 'non validé'}</td>
                                <td>
                                    <Button primary onClick={() => handleOpenComment(comment)}>Voir le commentaire</Button>
                                    <Button onClick={() => handleDeleteComment(comment.id)}>Supprimer</Button>
                                </td>
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>


                {comments && (
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={comments.length}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                    />
                )}

                {selectedComment && (
                    <CommentModal
                        comment={selectedComment}
                        onClose={handleCloseComment}
                        onTreated={(answer) => handleTreatedComment(selectedComment.id, answer)}
                    />
                )}
            </DashboardContainer>

        </div>
    );
};

export default CommentsTable;