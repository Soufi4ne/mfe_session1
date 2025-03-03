import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";

// Données statiques pour la démo
const movieData = {
  id: 1,
  title: "Stranger Things",
  year: 2016,
  seasons: 4,
  rating: "16+",
  duration: "50min",
  genres: ["Science Fiction", "Drame", "Fantastique"],
  description: 
    "Dans une petite ville tranquille, un groupe d'enfants fait face à des événements terrifiants lorsqu'ils commencent à enquêter sur la disparition mystérieuse d'un de leurs amis. Leurs investigations les mènent à découvrir des expériences secrètes, des phénomènes surnaturels et une étrange petite fille.",
  starring: ["Millie Bobby Brown", "Finn Wolfhard", "Noah Schnapp", "Caleb McLaughlin", "Gaten Matarazzo"],
  creator: "The Duffer Brothers",
  backgroundImage: "https://wallpaperaccess.com/full/1343405.jpg",
  posterImage: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
};

// Composants stylisés
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  z-index: -1;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 60px;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 4px;
  color: #fff;
  font-weight: 700;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #999;
  margin-bottom: 24px;
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 24px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #999;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SectionContent = styled.div`
  color: #fff;
  font-size: 1.1rem;
`;

const GenresList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const GenreTag = styled.span`
  background: rgba(229, 9, 20, 0.2);
  border: 1px solid rgba(229, 9, 20, 0.5);
  color: #fff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 32px 0;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:first-child {
    background: #e50914;
    color: white;
    border: none;
    
    &:hover {
      background: #b20710;
    }
  }
  
  &:nth-child(2) {
    background: rgba(109, 109, 110, 0.7);
    color: white;
    border: none;
    
    &:hover {
      background: rgba(109, 109, 110, 1);
    }
  }
`;

const ProductDetails = () => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const toggleTrailer = () => {
    setIsTrailerPlaying(!isTrailerPlaying);
    
    // Émission d'un événement custom pour communication inter-MFE
    const event = new CustomEvent('efreiflix:trailerToggled', {
      detail: {
        movieId: movieData.id,
        playing: !isTrailerPlaying,
        title: movieData.title
      }
    });
    window.dispatchEvent(event);
    console.log(`Événement émis: Bande-annonce ${!isTrailerPlaying ? 'démarrée' : 'arrêtée'} pour ${movieData.title}`);
  };

  const addToWatchlist = () => {
    // Émission d'un événement custom pour communication inter-MFE
    const event = new CustomEvent('efreiflix:addedToWatchlist', {
      detail: {
        movieId: movieData.id,
        title: movieData.title
      }
    });
    window.dispatchEvent(event);
    console.log(`Événement émis: ${movieData.title} ajouté à la liste de favoris`);
  };

  return (
    <Container>
      <BackgroundImage image={movieData.backgroundImage} />
      <ContentContainer>
        <PosterContainer>
          <Poster src={movieData.posterImage} alt={movieData.title} />
        </PosterContainer>
        <InfoContainer>
          <Title>{movieData.title}</Title>
          <Subtitle>
            <span>{movieData.year}</span>
            <Badge>{movieData.rating}</Badge>
            <span>{movieData.seasons} saisons</span>
            <span>{movieData.duration}</span>
          </Subtitle>
          
          <Description>{movieData.description}</Description>
          
          <ButtonContainer>
            <Button onClick={toggleTrailer}>
              {isTrailerPlaying ? "■ Arrêter" : "▶ Regarder la bande-annonce"}
            </Button>
            <Button onClick={addToWatchlist}>+ Ma Liste</Button>
          </ButtonContainer>
          
          <Section>
            <SectionTitle>Genres</SectionTitle>
            <GenresList>
              {movieData.genres.map((genre, index) => (
                <GenreTag key={index}>{genre}</GenreTag>
              ))}
            </GenresList>
          </Section>
          
          <Section>
            <SectionTitle>Avec</SectionTitle>
            <SectionContent>{movieData.starring.join(", ")}</SectionContent>
          </Section>
          
          <Section>
            <SectionTitle>Créateur</SectionTitle>
            <SectionContent>{movieData.creator}</SectionContent>
          </Section>
        </InfoContainer>
      </ContentContainer>
    </Container>
  );
};

export default ProductDetails; 