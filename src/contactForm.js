import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './button';
import axios from 'axios';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100vw;
  @media (min-width: 767px) {
    gap: 15px;
    width: 35vw;
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
`;

const ContactForm = ({ showSubject = true, defaultSubject = "" }) => {
  const [formData, setFormData] = useState({
    sujet: defaultSubject,
    nom: "",
    email: "",
    telephone: "",
    message: ""
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
      const response = await axios.post('http://localhost:3000/contact', formData);

      if (response.status === 201) {
        alert('Votre message a été envoyé avec succès !');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue lors de l'envoi de votre message.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showSubject && <Input type="text" name="sujet" placeholder="Sujet" value={formData.sujet} onChange={handleChange} required />}
      <Input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} required />
      <Input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required />
      <Input type="tel" name="telephone" placeholder="Votre téléphone" value={formData.telephone} onChange={handleChange} required />
      <Textarea rows="5" name="message" placeholder="Votre message" value={formData.message} onChange={handleChange} required></Textarea>
      <Button primary type="submit">Envoyer</Button>
    </Form>
  );
};

export default ContactForm;
