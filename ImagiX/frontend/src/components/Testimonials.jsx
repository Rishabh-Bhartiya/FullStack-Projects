// src/components/Testimonials.jsx

import React from 'react';
import { motion } from 'framer-motion';

// Assets import
import { assets, testimonialsData } from '../assets/assets';

/**
 * Testimonials Component
 * * This component showcases customer reviews. It's designed to be clean,
 * professional, and visually appealing on a dark theme.
 * * The component uses a high-contrast color scheme to make the cards stand
 * out elegantly against the pure black background.
 */
function Testimonials() {
    return (
        <motion.div
            className='flex flex-col items-center justify-center my-20 py-12 md:px-28 text-gray-200'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
                Customer Testimonials
            </h1>
            <p className='text-gray-400 mb-12'>
                What Our Users Are Saying
            </p>

            <div className='flex flex-wrap justify-center gap-6'>
                {testimonialsData.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className='bg-zinc-900 p-8 rounded-lg shadow-xl border border-zinc-800 w-full sm:w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300'
                    >
                        <div className='flex flex-col items-center text-center'>
                            <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className='rounded-full w-16 h-16 object-cover mb-4' 
                            />
                            <h2 className='text-xl font-semibold'>{testimonial.name}</h2>
                            <p className='text-gray-400 mb-4'>{testimonial.role}</p>
                            
                            <div className='flex mb-4 gap-1'>
                                {Array(testimonial.stars).fill().map((_, starIndex) => (
                                    <img 
                                        key={starIndex} 
                                        src={assets.rating_star} 
                                        alt="Star rating" 
                                        className='w-5 h-5'
                                    />
                                ))}
                            </div>
                            
                            <p className='text-sm text-gray-400 italic'>
                                "{testimonial.text}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Testimonials;