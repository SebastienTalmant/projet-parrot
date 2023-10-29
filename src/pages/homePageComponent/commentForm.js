import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../button';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90vw;

  @media (min-width: 768px) {
    width: 80vw;
    max-width: 900px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
  width: 95%;
  margin-top: 10px;
`;

const NameAndRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: row-reverse;
  font-size: 2rem;  

  input[type="radio"] {
    display: none;
    &:checked + label,
    &:checked ~ label {
      opacity: 1;
      color: gold;
    }
  }

  label {
    font-size: 2rem;
    color: gray;
    cursor: pointer;
    opacity: 0.3;
  }
`;


const CommentForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      score: 0,
      comment: ""
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${API_BASE_URL}comments`, formData);
  
        if (response.status === 200) {
          setFormData({
            name: "",
            score: 0,
            comment: ""
          });
  
          alert('Votre commentaire a été envoyé avec succès !');
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire:", error);
        alert("Une erreur est survenue lors de l'envoi de votre commentaire.");
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <h3>Laisser un commentaire</h3>
        <NameAndRating>
          <Input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
         
          <StarRating>
            {[5, 4, 3, 2, 1].map((rating) => (
              <React.Fragment key={rating}>
                <input type="radio" name="score" value={rating} id={`star${rating}`} onChange={handleChange} />
                <label htmlFor={`star${rating}`}>⭐</label>
              </React.Fragment>
            ))}
          </StarRating>
         
        </NameAndRating>
  
        <Textarea rows="5" name="comment" placeholder="Votre commentaire" value={formData.comment} onChange={handleChange} required></Textarea>
        <Button primary type="submit" style={{ marginTop: '10px' }}>Envoyer</Button>
      </Form>
    );
  };
  
  export default CommentForm;
  