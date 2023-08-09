import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../button';

const FormRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  width: 30%;
`;

const FormInput = styled.input`
  flex: 2;
  margin-left: 10px;
  width: 50px;
`;

const ScheduleForm = ({ onSubmit }) => {
  const [day, setDay] = useState('');
  const [morningOpen, setMorningOpen] = useState('');
  const [morningClose, setMorningClose] = useState('');
  const [afternoonOpen, setAfternoonOpen] = useState('');
  const [afternoonClose, setAfternoonClose] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(day, { morningOpen, morningClose, afternoonOpen, afternoonClose });
      alert('Enregistrement effectué')
      setDay('');
      setMorningOpen('');
      setMorningClose('');
      setAfternoonOpen('');
      setAfternoonClose('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel>Jour : </FormLabel>
        <select onChange={(e) => setDay(e.target.value)} required value={day}>
          <option value="">Selectionnez Jour</option>
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
      </FormRow>

      <FormRow>
        <FormLabel>Matin : </FormLabel>
        <FormInput
          type="text"
          value={morningOpen}
          onChange={(e) => setMorningOpen(e.target.value)}
          placeholder="Ouverture Matin"
        />
        <FormInput
          type="text"
          value={morningClose}
          onChange={(e) => setMorningClose(e.target.value)}
          placeholder="Fermeture Matin"
        />
      </FormRow>

      <FormRow>
        <FormLabel>Après-midi : </FormLabel>
        <FormInput
          type="text"
          value={afternoonOpen}
          onChange={(e) => setAfternoonOpen(e.target.value)}
          placeholder="Ouverture Après-midi"
        />
        <FormInput
          type="text"
          value={afternoonClose}
          onChange={(e) => setAfternoonClose(e.target.value)}
          placeholder="Fermeture Après-midi"
        />
      </FormRow>

      <Button primary type="submit">Valider</Button>
    </form>
  );
};

export default ScheduleForm;
