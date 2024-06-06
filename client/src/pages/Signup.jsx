import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [signup, { error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      if (data.signup) {
        Auth.login(data.signup.token); // Use your login function to store the token
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Your username"
        value={formState.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Your password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
      {error && <div>Sign up failed</div>}
    </form>
  );
};

export default Signup;
