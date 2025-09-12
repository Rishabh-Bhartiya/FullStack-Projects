// src/components/Steps.jsx

import React from 'react';
import { motion } from 'framer-motion';

// Assets import
import { assets, stepsData } from '../assets/assets';

/**
 * Steps Component
 * * This component outlines the simple three-step process for generating an image.
 * It uses a clean, card-based layout with icons and descriptive text to guide the user.
 * * The design is tailored for a high-contrast dark theme, using elevated cards
 * with subtle shadows to stand out against the pure black background.
 */
function Steps() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            className='flex flex-col items-center justify-center my-20 md:my-32'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-gray-200'>
                How It Works
            </h1>
            <p className='text-lg text-gray-400 mb-12'>
                Transform Words Into Stunning Images
            </p>

            <div className='space-y-4 w-full max-w-4xl px-4'>
                {stepsData.map((item, index) => (
                    <motion.div
                        key={index}
                        className='flex items-center gap-4 p-5 px-8 bg-zinc-900 border border-zinc-800 shadow-xl cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
                        variants={itemVariants}
                    >
                        <img src={item.icon} alt={item.title + " icon"} className='w-10 h-10' />
                        <div>
                            <h2 className='text-xl font-medium text-blue-400'>{item.title}</h2>
                            <p className='text-gray-400'>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default Steps;