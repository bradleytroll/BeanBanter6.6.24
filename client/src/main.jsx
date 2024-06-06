import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import './index.css'; // Optional: your custom styles

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
