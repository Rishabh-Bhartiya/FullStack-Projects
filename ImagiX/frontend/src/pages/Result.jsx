// src/pages/Result.jsx

import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

/**
 * Result Component
 * * This is the main interface for generating and viewing AI images.
 * It provides a dynamic experience, showing a placeholder image, a loading
 * animation, and the final generated image.
 * * The component is styled for a high-contrast dark theme, with a pure black
 * background and a vibrant electric blue accent for a sleek and modern feel.
 */
function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage, user } = useContext(AppContext);

  /**
   * @description Handles the form submission to generate a new image.
   * It prevents the default form behavior, sets the loading state, and
   * calls the generateImage function from the AppContext.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user) {
      if (input.trim()) {
        const generatedImage = await generateImage(input);
        setInput('');
        if (generatedImage) {
          setIsImageLoaded(true);
          setImage(generatedImage);
        }
      }
      setLoading(false);
    } else {
      toast.error("Please Login First")
      setLoading(false)
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center text-center p-4'
    >
      <div className='relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md'>
        {/* Main image display area */}
        <img
          src={image}
          alt="Generated image"
          className='w-full h-auto rounded-lg shadow-xl object-contain'
        />

        {/* Loading bar animation */}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-600 rounded-b-lg 
            ${loading ? 'w-full transition-all duration-[10s] ease-linear' : 'w-0'}`}
        />

        {/* Loading text */}
        <p className={`text-gray-400 mt-2 ${loading ? '' : 'hidden'}`}>
          Generating your image...
        </p>
      </div>

      {/* Input and button container for generating a new image */}
      {!isImageLoaded && (
        <div className='flex flex-col gap-4 w-full max-w-xl mt-10 items-center'>
          <div className='w-full bg-zinc-900 border border-zinc-800 text-gray-200 p-1 rounded-full shadow-lg'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Describe what you want to generate...'
              className='placeholder:text-gray-500 w-full bg-transparent outline-none ml-6 mr-2 py-2'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 w-1/2 sm:w-auto px-8 py-3 rounded-full transition-colors duration-300'
          >
            Generate
          </button>
        </div>
      )}

      {/* Action buttons after image is loaded */}
      {isImageLoaded && (
        <div className='flex gap-4 flex-wrap justify-center text-gray-200 p-1 mt-10'>
          <button
            onClick={() => setIsImageLoaded(false)}
            className='bg-transparent border border-gray-600 text-gray-200 px-8 py-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors'
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className='bg-blue-600 hover:bg-blue-700 px-10 py-3 rounded-full cursor-pointer transition-colors'
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
}

export default Result;