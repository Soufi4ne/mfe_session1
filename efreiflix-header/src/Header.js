import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "./i18n";
const HeaderContainer = styled.header`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 1.5rem 4%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const Logo = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  background: linear-gradient(45deg, #e50914, #eb144c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;
`;

const NavLink = styled.a`
  font-family: "Montserrat", sans-serif;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #e50914;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #e50914;

    &:after {
      width: 100%;
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <Logo>{t("logo.title")}</Logo>
      <Nav>
        <NavLink href="/accueil">{t("navigation.home")}</NavLink>
        <NavLink href="/series">{t("navigation.series")}</NavLink>
        <NavLink href="/films">{t("navigation.movies")}</NavLink>
        <NavLink href="/nouveautes">{t("navigation.newReleases")}</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
