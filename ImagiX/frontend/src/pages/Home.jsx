// src/pages/Home.jsx

import React from 'react';

// Component imports
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonials from '../components/Testimonials';
import GenerateBtn from '../components/GenerateBtn';

/**
 * Home Page Component
 * * This is the main landing page. It orchestrates the display of all key
 * sections of the website to present a complete user experience.
 * * It provides a pure black background to ensure consistency with the
 * overall site theme.
 */
function Home() {
  return (
    <div className='bg-black'>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn message='See The Magic. Try Now' />
    </div>
  );
}

export default Home;