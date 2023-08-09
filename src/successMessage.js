import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const StyledMessage = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;
  background-color: limegreen;
  color: white;
  z-index: 1000;
`;

function SuccessMessage() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2000); // le message disparaîtra après 2 secondes
    return () => clearTimeout(timer);
  }, []);

  return (
    <CSSTransition in={showMessage} timeout={300} className="alert" unmountOnExit>
      <StyledMessage>
        Enregistrement effectué
      </StyledMessage>
    </CSSTransition>
  );
}

export default SuccessMessage;
