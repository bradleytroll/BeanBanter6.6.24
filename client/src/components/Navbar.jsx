import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.JPEG';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "../../src/index.css"




const Button = styled.button`
  background-color: #d2b48c;
  color: #8b4513;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  width: 100%;
  box-sizing: border-box;
`;



const Modal = styled.div`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: sticky;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 20%;
  // overflow: auto;
  background-color: #03212e;
  background-color: #03212e;
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

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logoContainer">
        <img src={logo} className='logoImage' alt="Logo" href="./assets/logo.jpeg"></img> 
        </div>
        <div className="menuButtonGroup">
            <Button as={Link} to="/" className="menuButton">Home</Button>
            {Auth.loggedIn() ? (
            <>
                <Button as={Link} to="/dashboard" className="menuButton" >Dashboard</Button>
                <Button as="a" to="/" onClick={() => Auth.logout()} className="menuButton">Logout</Button>
            </>
          ) : (
            <>
                <Button as={Link} to="/signup" className="menuButton">Signup</Button>
                <Button as={Link} to="/login" className="menuButton">Login</Button>
            </>
          )}
          <div>
            <Button onClick={toggleModal} className="menuButton">About</Button>
          </div>
        </div>
      </nav>
      
      <div className="tagline">
            The place to spill the tea...{"\n"}or coffee!
          </div>

      <Modal $show={showModal} className="modal">
        <div className="modalcontent">
          <div onClick={toggleModal} className="modalCloseButton">&times;</div>
          <h2>About BeanBanter</h2>
          <p>
            Welcome to BeanBanter, your go-to app for tracking and rating coffee shops. 
            Join us to discover new favorites and share your experiences with the community.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
