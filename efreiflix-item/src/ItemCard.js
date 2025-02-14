import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ItemCardContainer = styled.div`
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);

    img {
      opacity: 0.8;
    }

    .info-overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }
`;

const InfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9) 30%);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemCard = ({ imageSrc, alt, onClick, title, description }) => {
  return (
    <ItemCardContainer onClick={onClick}>
      <img src={imageSrc} alt={alt} />
      <InfoOverlay className="info-overlay">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </InfoOverlay>
    </ItemCardContainer>
  );
};

ItemCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ItemCard;
