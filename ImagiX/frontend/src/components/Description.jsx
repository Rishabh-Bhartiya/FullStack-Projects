// src/components/Description.jsx

// React and motion library imports
import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

/**
 * Description Component
 * * This component displays a descriptive section for the AI image generator,
 * including a title, a brief description, an example image, and a detailed
 * explanation of the tool's functionality.
 * * The design is optimized for a high-contrast dark theme, using a pure
 * black background and a vibrant electric blue accent.
 */
function Description() {
    return (
        <motion.div
            className='flex flex-col items-center justify-center my-24 p-6 md:px-28 text-gray-200'
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-gray-200'>
                Create AI Images
            </h1>
            <p className='text-gray-400 mb-8'>
                Turn Your Imagination Into Visuals
            </p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
                <img 
                    className='w-80 xl:w-96 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300'
                    src={assets.sample_img_1} 
                    alt="AI-generated sample image"
                />
                
                <div className='flex flex-col'>
                    <h2 className='text-2xl sm:text-3xl font-medium max-w-lg mb-4 text-blue-400'>
                        Introducing The AI-Powered Text to Image Generator
                    </h2>
                    
                    <p className='text-gray-400 mb-4'>
                        Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
                    </p>
                    <p className='text-gray-400 mb-4'>
                        Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default Description;