import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #000;
  padding: 4rem 4%;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 5rem;
  font-family: 'Montserrat', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const Section = styled.div`
  h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    font-family: 'Montserrat', sans-serif;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #e50914;
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.8rem;
  }
`;

const FooterLink = styled.a`
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e50914;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e50914;
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Section>
          <h4>Navigation</h4>
          <LinkList>
            <li><FooterLink href="/accueil">Accueil</FooterLink></li>
            <li><FooterLink href="/series">Séries</FooterLink></li>
            <li><FooterLink href="/films">Films</FooterLink></li>
            <li><FooterLink href="/nouveautes">Nouveautés</FooterLink></li>
          </LinkList>
        </Section>
        
        <Section>
          <h4>Légal</h4>
          <LinkList>
            <li><FooterLink href="/confidentialite">Confidentialité</FooterLink></li>
            <li><FooterLink href="/conditions">Conditions d'utilisation</FooterLink></li>
            <li><FooterLink href="/cookies">Préférences cookies</FooterLink></li>
          </LinkList>
        </Section>
        
        <Section>
          <h4>Social</h4>
          <SocialLinks>
            <SocialIcon href="#"><i className="fab fa-twitter"></i></SocialIcon>
            <SocialIcon href="#"><i className="fab fa-facebook-f"></i></SocialIcon>
            <SocialIcon href="#"><i className="fab fa-instagram"></i></SocialIcon>
          </SocialLinks>
        </Section>
      </ContentWrapper>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '3rem',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.9rem'
      }}>
        © {new Date().getFullYear()} EFREIFlix. Tous droits réservés.
      </div>
    </FooterContainer>
  );
};

export default Footer; 