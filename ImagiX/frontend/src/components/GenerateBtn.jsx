// src/components/GenerateBtn.jsx

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Assets and context imports
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

/**
 * GenerateBtn Component
 * * This component renders a prominent call-to-action button,
 * encouraging users to try the image generation service. It stands out as
 * a distinct section with a high-contrast design.
 * * The button's vibrant electric blue color and smooth hover effects are
 * designed to be highly visible and engaging against the dark background.
 */
function GenerateBtn({ message}) {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className='text-center my-16 py-10 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-8'>
        {message}
      </h1>

      <motion.button
        onClick={onClickHandler}
        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:scale-105 transition-all duration-500 hover:bg-blue-700'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Images
        <img src={assets.star_group} alt="Star group icon" className='h-6' />
      </motion.button>
    </motion.div>
  );
}

export default GenerateBtn;