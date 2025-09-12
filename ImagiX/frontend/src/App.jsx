// src/App.jsx

// Library and component imports
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context and component imports
import { AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';

/**
 * Main App Component
 * * This is the root component of the application, responsible for setting
 * the global layout, routing, and shared state.
 * * It provides a consistent, pure black background for the entire application,
 * creating a sleek and modern visual foundation for all other components.
 */
function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <div className='bg-black text-gray-200 min-h-screen font-sans'>
      {/* Toast notifications container, styled for the dark theme */}
      <ToastContainer position='bottom-right' theme='dark' />

      {/* Renders the navigation bar at the top of the page */}
      <Navbar />
      
      {/* Conditionally renders the login modal based on global state */}
      {showLogin && <Login />}

      {/* Main content area with horizontal padding for all pages */}
      <main className='px-4 md:px-14 sm:px-10 lg:px-28 min-h-[calc(100vh-100px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />
        </Routes>
      </main>

      {/* Renders the footer at the bottom of the page */}
      <Footer />
    </div>
  );
}

export default App;