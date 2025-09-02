// src/components/Navbar.jsx

// React, hooks, and routing imports
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Assets and context imports
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';

/**
 * Navbar Component
 * * This component renders the main navigation bar. It dynamically changes its
 * content based on the user's authentication status, providing clear paths
 * for both logged-in and guest users.
 * * Styled with a pure black background, the component uses an electric blue
 * accent color for key elements to create a sharp, high-contrast visual appeal.
 */
function Navbar() {
    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <nav className='flex items-center justify-between py-3 px-4 md:px-28 lg:px-28 border-b border-zinc-800 sticky top-0 z-50 bg-black'>
            <Link className='flex justify-center items-center' to={'/'}>
                <img
                    src={assets.logo}
                    alt="Imagify Logo"
                    className='w-28 sm:w-32 lg:w-40'
                />
                <span className='text-3xl font-extrabold'>Imagi<span className='text-red-500'>X</span></span>
            </Link>

            <div className='flex items-center gap-4 sm:gap-6'>
                {user ? (
                    <div className='flex items-center gap-3 sm:gap-5'>
                        {/* Credit display button with hover effect */}
                        <button
                            onClick={() => navigate('/buy')}
                            className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2 sm:px-6 sm:py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-md'
                        >
                            <img className='w-5 bg-white rounded-full border-2 border-white' src={assets.credit_star} alt="Credit star icon" />
                            <p className='text-xs sm:text-sm font-medium'>
                                Credit Left : {credit}
                            </p>
                        </button>

                        <p className='text-gray-400 max-sm:hidden'>
                            Hi, {user.name}
                        </p>

                        {/* Profile icon with dropdown menu */}
                        <div className='relative group'>
                            <img
                                className='w-10 cursor-pointer rounded-full border-2 border-transparent group-hover:border-blue-600 transition-all'
                                src={assets.profile_icon}
                                alt="Profile icon"
                            />
                            <div className={`absolute hidden group-hover:block top-full right-0 z-10 w-40 text-gray-200 pt-2`}>
                                <ul className='list-none m-0 p-2 bg-zinc-900 rounded-md shadow-lg border border-zinc-700 text-sm'>
                                    <li
                                        onClick={logout}
                                        className='py-2 px-3 cursor-pointer hover:bg-zinc-800 rounded transition-colors'
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-4 sm:gap-6'>
                        <p
                            onClick={() => navigate('/buy')}
                            className='cursor-pointer text-gray-400 hover:text-blue-600 transition-colors'
                        >
                            Pricing
                        </p>
                        <button
                            onClick={() => setShowLogin(true)}
                            className='bg-blue-600 text-white px-7 py-2 sm:px-10 text-sm rounded-full shadow-lg hover:bg-blue-700 transition-colors'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

{/* <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
    </ul>
</div> */}