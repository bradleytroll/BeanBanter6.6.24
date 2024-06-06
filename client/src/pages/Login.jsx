import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Auth from '../utils/auth';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      Auth.login(data.login.token);
      // Redirect to the dashboard or another page if necessary
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
