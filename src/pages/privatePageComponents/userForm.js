import React, { useState } from 'react';
import Button from '../../button';

const UserForm = ({ onSubmit, initialValues, onClose }) => {
  const [email, setEmail] = useState(initialValues.email || '');
  const [password, setPassword] = useState(initialValues.password || '');
  const [confirmPassword, setConfirmPassword] = useState(initialValues.confirmPassword || '');
  const [error, setError] = useState(null);
  const [setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const formData = { email, password };
    const response = await onSubmit(formData);

    if (response && response.status === 200) {
      setIsSuccess(true);
      alert('Enregistrement effectué')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmer mot de passe"
      />
      <Button primary type="submit">Enregistrer</Button>
      <Button onClick={onClose}>Annuler</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UserForm;
