import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Vehicules from './pages/Vehicules';
import Contact from './pages/Contact';
import Private from './pages/Private';
import logo from './logo.png';
import { AuthProvider } from './pages/privatePageComponents/AuthContext';



const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  transition: top 0.3s;
  z-index: 1;
  @media (min-width: 768px) {
    background-color: #8D99AE;
  }
`;

const ImageLogo = styled.img`
  height: 60px;
  @media (min-width: 768px) {
    height: 80px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 75%;
  background-color: #8D99AE;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  position: absolute;
  top: 0px;
  right: 0;
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  padding-top: 100px;
  padding-bottom: 100px;
  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    transform: none;
    font-size: 1.2rem;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;



const NavLink = styled(Link)`
  margin: 0 30px;
  text-decoration: none;
  color: #EDF2F4;
  margin-top: 20px;
  &:hover {
    color: #2B2D42;
  }
  @media (min-width: 768px) {
    margin-top: 0px;
  }
`;

const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin-right: 20px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerLine = styled.div`
  width: 2rem;
  height: 0.25rem;
  background: #EF233C;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  :first-child {
    transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
  }

  :nth-child(2) {
    opacity: ${({ open }) => open ? '0' : '1'};
  }

  :nth-child(3) {
    transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`;

function App() {

  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  }
  return (
    <AuthProvider>
      <Router>
        <Header>
          <ImageLogo src={logo} alt="Logo" />
          <BurgerButton open={open} onClick={() => setOpen(!open)}>
            <BurgerLine open={open} />
            <BurgerLine open={open} />
            <BurgerLine open={open} />
          </BurgerButton>
          <Nav open={open}>
            <NavLink to="/" onClick={closeMenu}>Accueil</NavLink>
            <NavLink to="/vehicules" onClick={closeMenu}>Nos Véhicules</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            <NavLink to="/private" onClick={closeMenu}>Espace Privé</NavLink>
          </Nav>
        </Header>

        <Routes>
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/private" element={<Private />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
