import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';
import styled from 'styled-components';
import Button from '../../button';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const StyledSelect = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
`;

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
    width: 100px;
    height: 100px;
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

const StyledLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
`;

const StyledOption = styled.option`
`;
const AnnoncesForm = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [prix, setPrix] = useState('');
    const [annee, setAnnee] = useState('');
    const [nbplaces, setNbplaces] = useState('');
    const [puissance, setPuissance] = useState('');
    const [energie, setEnergie] = useState('');
    const [couleur, setCouleur] = useState('');
    const [premiermain, setPremiermain] = useState('');
    const [kilometrage, setKilometrage] = useState('');
    const [boite, setBoite] = useState('');
    const [interieur, setInterieur] = useState('')
    const [allOptions, setAllOptions] = useState([]);
    const [currentOption, setCurrentOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log("Fetching options from the backend");
        axios.get('http://localhost:3000/options_equipements')
            .then(res => {
                console.log("Received options:", res.data);
                const optionsMap = {};
                for (let opt of res.data) {
                    optionsMap[opt.nom] = opt.id;
                }
                setAllOptions(optionsMap);
            })
            .catch(err => {
                console.error("Error fetching options:", err);
            });
    }, []);


    const handleOptionChange = (e) => {
        setCurrentOption(e.target.value);
    };

    const handleAddOption = () => {
        const optionId = allOptions[currentOption];
        if (optionId) {
            if (!selectedOptions.some(opt => opt.id === optionId)) {
                setSelectedOptions([...selectedOptions, { nom: currentOption, id: optionId }]);
                setCurrentOption('');
            }
        } else {
            axios.post('http://localhost:3000/options_equipements', { option: currentOption })
                .then(res => {
                    const newOption = { nom: currentOption, id: res.data.id };
                    setAllOptions({ ...allOptions, [currentOption]: res.data.id });
                    setSelectedOptions([...selectedOptions, newOption]);
                    setCurrentOption('');
                })
                .catch(err => console.error(err));
        }
    };
    

    const handleRemoveOption = (optionNameToRemove) => {
        setSelectedOptions(prevOptions => prevOptions.filter(option => option.nom !== optionNameToRemove));
    };


    const optionNames = Object.keys(allOptions);
    const filteredOptions = optionNames.filter(option => option.toLowerCase().includes(currentOption.toLowerCase()));
    


    const s3 = new S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitting form with data:", {
            titre, description, images, prix, annee, nbplaces, puissance, energie, couleur, premiermain, kilometrage, boite, interieur, options: selectedOptions
        });

        let annonceID
        const imageUrls = [];

        try {
            for (const file of images) {
                const uploadParams = {
                    Bucket: 'projet-parrot-services',
                    Key: uuidv4(),
                    Body: file
                };

                const response = await s3.upload(uploadParams).promise();
                imageUrls.push(response.Location);
            }

            if (!imageUrls.length) {
                throw new Error("Failed to upload images to S3");
            }

            const formData = {
                titre,
                description,
                prix,
                annee,
                nbplaces,
                puissance,
                energie,
                couleur,
                premiermain,
                kilometrage,
                boite,
                interieur,
            };

            const annonceResponse = await axios.post('http://localhost:3000/annonces', formData);
            annonceID = annonceResponse.data.annonce_id;
            let annonce_id = annonceID
            if (!annonceID) {
                throw new Error("annonce_id not returned from server");
            }

            for (const photo_url of imageUrls) {
                await axios.post('http://localhost:3000/photos', {
                    annonce_id,
                    photo_url
                });
            }

            
            for (const option of selectedOptions) {
                const optionId = allOptions[option.nom];
                if (optionId) {                    
                    await axios.post('http://localhost:3000/annonces_options', {
                        annonce_id,
                        option_name: option.nom
                    });
                } else {
                    console.error("Couldn't find ID for option:", option);
                }
            }
            


            alert('L\'enregistrement a été effectué avec succès!');

        } catch (error) {
            console.error('Error during the process:', error);

            for (const imageUrl of imageUrls) {
                const fileName = imageUrl.split('/').pop();
                await s3.deleteObject({
                    Bucket: 'projet-parrot-services',
                    Key: fileName
                }).promise();
            }

            if (annonceID) {
                axios.post('http://localhost:3000/cleanup', { annonce_id: annonceID });
            }

            if (error.message === "Failed to upload images to S3") {
                alert('Échec de l\'envoi des photos. Veuillez réessayer.');
            } else {
                alert('Une erreur s\'est produite pendant le processus. Veuillez réessayer.');
            }
        }
        finally {
            setIsLoading(false);
        }
    };


    return (
        <FormContainer>
            <StyledLabel>Titre :</StyledLabel>
            <StyledInput
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Titre de l'annonce"
                required
            />

            <StyledLabel>Description :</StyledLabel>
            <StyledTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'annonce"
                required
            />

            <StyledLabel>Prix :</StyledLabel>
            <StyledInput
                type="number"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                placeholder="Prix"
                required
            />

            <StyledLabel>Année :</StyledLabel>
            <StyledInput
                type="number"
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                placeholder="Année"
                required
            />

            <StyledLabel>Nombre de places :</StyledLabel>
            <StyledInput
                type="number"
                value={nbplaces}
                onChange={(e) => setNbplaces(e.target.value)}
                placeholder="Nombre de places"
                required
            />

            <StyledLabel>Puissance :</StyledLabel>
            <StyledInput
                type="number"
                value={puissance}
                onChange={(e) => setPuissance(e.target.value)}
                placeholder="Puissance"
                required
            />

            <StyledLabel>Énergie :</StyledLabel>
            <StyledInput
                type="text"
                value={energie}
                onChange={(e) => setEnergie(e.target.value)}
                placeholder="Énergie"
                required
            />

            <StyledLabel>Couleur :</StyledLabel>
            <StyledInput
                type="text"
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
                placeholder="Couleur"
                required
            />

            <StyledLabel>Première main :</StyledLabel>
            <StyledSelect
                value={premiermain}
                onChange={(e) => setPremiermain(e.target.value)}
            >
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
            </StyledSelect>

            <StyledLabel>Kilométrage :</StyledLabel>
            <StyledInput
                type="number"
                value={kilometrage}
                onChange={(e) => setKilometrage(e.target.value)}
                placeholder="Kilométrage"
                required
            />

            <StyledLabel>Boîte de vitesse :</StyledLabel>
            <StyledSelect
                value={boite}
                onChange={(e) => setBoite(e.target.value)}
            >
                <option value="Oui">Automatique</option>
                <option value="Non">Manuelle</option>
            </StyledSelect>

            <StyledLabel>Type intérieur :</StyledLabel>
            <StyledTextarea
                value={interieur}
                onChange={(e) => setInterieur(e.target.value)}
                placeholder="Tissu, cuir..."
                required
            />

            <StyledLabel>Photos :</StyledLabel>
            <StyledInput type="file" multiple accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleImageUpload} />


            <ImagePreviewContainer>
                {images.map((file, index) => (
                    <ImagePreview key={index}>
                        <img src={URL.createObjectURL(file)} alt="Aperçu" />
                        <Button primary={false} onClick={() => handleRemoveImage(index)}>X</Button>
                    </ImagePreview>
                ))}
            </ImagePreviewContainer>
            <StyledLabel>Options :</StyledLabel>
            <StyledInput
                type="text"
                value={currentOption}
                onChange={handleOptionChange}
                list="options"
            />
            <datalist id="options">
                {filteredOptions.map(option => (
                    <StyledOption key={option} value={option} />
                ))}
            </datalist>


            <Button primary onClick={handleAddOption}>Ajouter/Sélectionner l'option</Button>

            <ul>
                {selectedOptions.map(option => (
                    <li key={option.nom}>
                        {option.nom}
                        <Button onClick={() => handleRemoveOption(option.nom)}>X</Button>
                    </li>
                ))}
            </ul>

            <Button primary onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Chargement..." : "Publier l'annonce"}
</Button>
        </FormContainer>
    );
};

export default AnnoncesForm;