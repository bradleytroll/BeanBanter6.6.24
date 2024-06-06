// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import 'bulma/css/bulma.min.css'; // Import Bulma CSS
// import './index.css'; // Optional: your custom styles

// import App from './App.jsx';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Signup from './pages/Signup';
// import Login from './pages/Login.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <h1 className="display-2">Wrong page!</h1>,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }, {
//         path: '/dashboard',
//         element: <Dashboard />
//       }, {
//         path: '/signup',
//         element: <Signup />
//       }, {
//         path: '/login',
//         element: <Login />
//       }
//     ]
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// );

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
