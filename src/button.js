import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  background: ${props => props.primary ? '#8D99AE' : '#EF233C'};
  color: #EDF2F4;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${props => props.primary ? '#2B2D42' : '#D80032'};
  }
  @media (max-width: 767px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    margin: 0 0.3rem;
  }
`;

export default Button;