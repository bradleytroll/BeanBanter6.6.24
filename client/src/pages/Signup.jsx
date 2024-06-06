import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations'; // Ensure this path is correct

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({ variables: { username, email, password } });
      Auth.login(data.signup.token);
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Signup;
