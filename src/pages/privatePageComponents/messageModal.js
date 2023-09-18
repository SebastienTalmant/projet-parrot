import React from 'react';
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

const MessageModal = ({ message, onClose, onTreated }) => {
    console.log("Status of the message:", message);

    return (
        <ModalOverlay>
            <ModalContainer>

                <h2>{message.sujet}</h2>
                <p><strong>Nom :</strong> {message.nom}</p>
                <p><strong>Email :</strong> {message.email}</p>
                <p><strong>Téléphone :</strong> {message.telephone}</p>
                <p><strong>Date de Réception :</strong> {moment(message.date_reception).format('DD/MM/YYYY')}</p>
                <p><strong>Date de Traitement :</strong> {message.date_traitement ? moment(message.date_traitement).format('DD/MM/YYYY') : "Pas encore traité"}</p>
                <p>{message.message}</p>

                <div>

                    {message.statut === 'non-traité' && (
                        <>
                            <Button primary onClick={onTreated}>Message traité</Button>
                            <Button onClick={onClose}>Laisser en non-traité</Button>
                        </>
                    )}

                    {message.statut === 'traité' && (
                        <Button primary onClick={onClose}>Fermer</Button>
                    )}
                </div>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default MessageModal;
