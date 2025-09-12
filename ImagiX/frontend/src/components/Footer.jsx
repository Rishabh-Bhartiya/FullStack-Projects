// src/components/Footer.jsx

import React from 'react';
import { assets } from '../assets/assets';

/**
 * Footer Component
 * * This component renders the website's footer. It's styled with a
 * high-contrast dark theme, using pure black and soft grays to provide a
 * professional and clean look that complements the rest of the application.
 */
function Footer() {
    return (
        <footer className='flex 2xl:flex-col sm:flex-row items-center justify-between gap-6 lg:py-0.5 py-5 px-0 md:px-28 mt-20 text-gray-400 bg-black border-t border-zinc-800'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center justify-center '>
                    <img src={assets.logo} alt="ImagiX Logo" className='w-28 sm:w-36' />
                    <span className='text-3xl font-extrabold'>Imagi<span className='text-red-500'>X</span></span>
                </div>
                <p className='border-l border-zinc-700 pl-4 text-sm max-sm:hidden'>
                    &copy; 2026 <span className=''>Imagi<span className='text-red-500'>X</span></span> | All rights reserved.
                </p>
            </div>

            <div className='flex gap-2.5'>
                <img src={assets.facebook_icon} alt="Facebook" className='w-8 h-8 opacity-80 hover:opacity-100 transition-opacity' />
                <img src={assets.twitter_icon} alt="Twitter" className='w-8 h-8 opacity-80 hover:opacity-100 transition-opacity' />
                <img src={assets.instagram_icon} alt="Instagram" className='w-8 h-8 opacity-80 hover:opacity-100 transition-opacity' />
            </div>
        </footer>
    );
}

export default Footer;