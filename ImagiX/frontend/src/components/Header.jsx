// src/components/Header.jsx

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Assets and context imports
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';

/**
 * Header Component
 * * This component serves as the main hero section of the website, featuring
 * a prominent title, a description, a call-to-action, and sample images.
 * * The component is styled for a high-contrast dark theme, using vibrant
 * electric blue for key highlights to create a dynamic and engaging visual.
 */
function Header() {
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
            className='flex flex-col items-center text-center my-20 md:my-28 text-white'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <motion.div
                className='inline-flex items-center gap-2 bg-zinc-900 text-gray-400 px-6 py-1 rounded-full border border-zinc-800'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <p>Best Text To Image Generator</p>
                <img src={assets.star_icon} alt="Star icon" />
            </motion.div>

            <motion.h1
                className='text-3xl max-w-[300px] sm:text-5xl sm:max-w-[590px] mx-auto mt-10 text-center font-bold leading-tight text-gray-200'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
            >
                Turn Text To <span className='text-blue-600'>Image</span>, in Seconds.
            </motion.h1>

            <motion.p
                className='text-gray-400 mx-auto mt-6 text-center max-w-xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                Unleash your creativity with AI. Turn your imagination into visual art in seconds—just type, and watch the magic happen.
            </motion.p>

            <motion.button
                className='sm:text-lg bg-blue-600 hover:bg-blue-700 text-white w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full transition-colors duration-300 shadow-xl'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                onClick={onClickHandler}
            >
                Generate Image
                <img className='h-6' src={assets.star_group} alt="Star group icon" />
            </motion.button>

            <motion.div
                className='flex flex-wrap justify-center mt-16 gap-3 md:gap-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                {Array(6).fill('').map((item, index) => (
                    <motion.img
                        key={index}
                        whileHover={{ scale: 1.05, duration: 0.1 }}
                        className='rounded hover:scale-105 transition-all duration-300 cursor-pointer w-20 h-20 md:w-28 md:h-28 object-cover shadow-lg'
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_3}
                        alt={`Sample generated image ${index + 1}`}
                    />
                ))}
            </motion.div>

            <motion.p
                className='mt-4 text-gray-500'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                Generated Images From Imagify
            </motion.p>
        </motion.div>
    );
}

export default Header;