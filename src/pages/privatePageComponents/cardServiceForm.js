import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';
import styled from 'styled-components';
import Button from '../../button';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 512px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
  resize: vertical;
`;

const CardServiceForm = ({ onSubmit, initialValues = {}, onClose }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(initialValues.image || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(initialValues.title || '');
    setDescription(initialValues.description || '');
    setImage(initialValues.image || '');
  }, [initialValues]);

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = image;
      if (file) {
        if (imageUrl) {
          const deleteParams = {
            Bucket: 'projet-parrot-services',
            Key: imageUrl.split('/').pop()
          };
          await s3.deleteObject(deleteParams).promise();
        }

        const uploadParams = {
          Bucket: 'projet-parrot-services',
          Key: uuidv4(),
          Body: file
        };
        const response = await s3.upload(uploadParams).promise();
        imageUrl = response.Location;
      }

      await onSubmit({ title, description, image: imageUrl });
      alert('Enregistrement effectué');
      setTitle('');
      setDescription('');
      setImage('');
      setFile(null);
    } catch (error) {
      alert(`Erreur lors de l'enregistrement : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <StyledInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Service"
          required
          disabled={isLoading}
        />
        <StyledTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          disabled={isLoading}
        />
        <StyledInput
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={isLoading}
        />

        <Button primary type="submit" disabled={isLoading}>Enregistrer</Button>
        <Button onClick={onClose} disabled={isLoading}>Annuler</Button>
      </FormContainer>
    </form>
  );
};

export default CardServiceForm;
