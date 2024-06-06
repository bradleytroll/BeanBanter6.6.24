import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';
import logo from '../assets/logo.JPEG'; // Adjust the path to the location of your JPEG file

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // Smaller gap between buttons
`;

const NavLink = styled(Link)`
  color: #8B4513; // Dark brown font color
  text-decoration: none;
  margin: 0 0.5rem;
  padding: 0.4rem 0.8rem; // Smaller button size
  background-color: #D2B48C; // Light brown background
  border-radius: 8px;
  font-size: 1rem;
  width: 150px; // Set a specific width for the buttons
  text-align: center; // Center the text within the button

  &:hover {
    background-color: #C19A6B; // Slightly darker shade of light brown for hover
  }
`;

const Logo = styled.img`
  width: 250px; // Increase width
  height: 150px; // Keep height the same
  border-radius: 8px;
`;

const Tagline = styled.span`
  font-size: 1.5rem;
  color: #D2B48C;
  font-family: 'Stencil Std, Charcoal, sans-serif'; // Stenciled font
  font-weight: bold;
  margin-left: 20px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #D2B48C;
  color: #8B4513;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #C19A6B;
  }
`;

const NavbarComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="Logo" />
          <Tagline>The place to spill the tea on coffee.</Tagline>
        </div>
        <NavLinks>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NavLink to="/">Home</NavLink>
            {Auth.loggedIn() ? (
              <NavLink to="/dashboard">Dashboard</NavLink>
            ) : (
              <NavLink to="/signup">Signup</NavLink>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {Auth.loggedIn() ? (
              <NavLink as="a" href="/" onClick={() => Auth.logout()}>Logout</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
            <NavLink as="button" onClick={toggleModal}>About</NavLink>
          </div>
        </NavLinks>
      </Navbar>
      {isModalOpen && (
        <ModalBackground onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>About BeanBanter</h2>
            <p>Welcome to BeanBanter, your go-to app for tracking and rating coffee shops. Join us to discover new favorites and share your experiences with the community.</p>
            <CloseButton onClick={toggleModal}>Close</CloseButton>
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default NavbarComponent;
