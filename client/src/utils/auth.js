// client/src/utils/auth.js
import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error("No token found");
    }
    console.log('Decoding token:', token); // Log the token before decoding
    return decode(token);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      console.log('Decoded token:', decoded);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Token expiration check error:', err); // Log any error during expiration check
      return false;
    }
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    console.log('Retrieved token from localStorage:', token); // Log the retrieved token
    return token;
  }

  login(idToken) {
    console.log('Storing token:', idToken); // Log the token being stored
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
