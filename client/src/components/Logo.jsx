import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.JPEG'; // Adjust the path to the location of your JPEG file
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Tagline = styled.div`
  font-size: 24px;
  text-align: center;
  background-color: #D2B48C; // Light brown background
  padding: 10px; // Added padding for better appearance
  color: #8B4513; // Dark brown font color
  font-weight: bold; // Bolder font
  border-radius: 8px; // Rounded edges
  font-family: 'Courier New', Courier, monospace; // Stencil-like font
  white-space: pre; // Preserve white space for line breaks
  margin: 0 20px; // Centering space
`;

const LogoImage = styled.img`
  width: 350px; // Adjust the width
  height: auto;
  padding: 0;
  border-radius: 8px; // Rounded edges for the logo
`;

const Button = styled.button`
  background-color: #D2B48C; // Light brown background
  color: #8B4513; // Dark brown font color
  padding: 8px 16px; // Smaller padding for smaller buttons
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  width: 100%; // Ensure all buttons have the same width
  box-sizing: border-box;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Modal = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Logo = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
          <Tagline>
            The place to spill the tea...{"\n"}on coffee!
          </Tagline>
        </LogoContainer>
        <ButtonGroupContainer>
          <ButtonGroup>
            <Button as={Link} to="/">Home</Button>
            {Auth.loggedIn() ? (
              <>
                <Button as={Link} to="/dashboard">Dashboard</Button>
                <Button as="a" href="/" onClick={() => Auth.logout()}>Logout</Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/signup">Signup</Button>
                <Button as={Link} to="/login">Login</Button>
              </>
            )}
            <Button onClick={toggleModal}>About</Button>
          </ButtonGroup>
        </ButtonGroupContainer>
      </Navbar>
      <Modal show={showModal}>
        <ModalContent>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>
          <h2>About BeanBanter</h2>
          <p>
            Welcome to BeanBanter, your go-to app for tracking and rating coffee shops. 
            Join us to discover new favorites and share your experiences with the community.
          </p>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logo;
