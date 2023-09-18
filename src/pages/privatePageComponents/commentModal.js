import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../../button';
import moment from 'moment';

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

const ModalContainer = styled.div`
  background-color: #EDF2F4;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentModal = ({ comment, onClose, onTreated }) => {
    const [answer, setAnswer] = useState(comment.answer || "");
    const handleSubmit = () => {
        onTreated(answer);
    };
    
    return (
        <ModalOverlay>
            <ModalContainer>
    
                <h2>{comment.name}</h2>
                <p><strong>Commentaire :</strong> {comment.comment}</p>
                <p><strong>Commentaire validé :</strong> {comment.approved ? "Oui" : "Non"}</p>
                <p><strong>Date de Réception :</strong> {moment(comment.reception_date).format('DD/MM/YYYY')}</p>
                
                {!comment.approved ? (
                    <div>
                        <label htmlFor="answer">Réponse :</label>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} id="answer" />
                    </div>
                ) : comment.answer && (
                    <p><strong>Réponse :</strong> {comment.answer}</p>
                )}
    
                <div>
                    {!comment.approved ? (
                        <>
                            <Button primary onClick={handleSubmit}>Valider le commentaire</Button>
                            <Button onClick={onClose}>Fermer sans valider</Button>
                        </>
                    ) : (
                        <Button primary onClick={onClose}>Fermer</Button>
                    )}
                </div>
            </ModalContainer>
        </ModalOverlay>
    );
    
};

export default CommentModal;
