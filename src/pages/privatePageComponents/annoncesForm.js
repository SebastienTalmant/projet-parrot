import React, { useState } from 'react';
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

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  img {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
    padding: 2px 5px;
    font-size: 0.8rem;
    border-radius: 2px;
  }
`;

const AnnoncesForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const uploadParams = {
      Bucket: 'projet-parrot-services',
      Key: uuidv4(),
      Body: file
    };

    try {
      const response = await s3.upload(uploadParams).promise();
      setImages([...images, response.Location]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <StyledInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de l'annonce"
      />
      <StyledTextarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de l'annonce"
      />

      <StyledInput type="file" onChange={handleImageUpload} />
      <ImagePreviewContainer>
        {images.map((src, index) => (
          <ImagePreview key={index}>
            <img src={src} alt="Aperçu" />
            <Button primary={false} onClick={() => handleRemoveImage(index)}>X</Button>
          </ImagePreview>
        ))}
      </ImagePreviewContainer>

      <Button primary onClick={handleSubmit}>Publier l'annonce</Button>
    </FormContainer>
  );
};

export default AnnoncesForm;
