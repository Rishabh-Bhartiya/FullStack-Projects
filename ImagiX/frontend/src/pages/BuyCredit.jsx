// src/pages/BuyCredit.jsx

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenerateBtn from '../components/GenerateBtn'
import { toast } from 'react-toastify';

// Assets and context imports
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';

/**
 * BuyCredit Component
 * * This component displays the credit purchase plans and handles the payment
 * process via Razorpay. It is designed to be a clear and secure interface for
 * users to buy credits for image generation.
 * * The component is styled with a high-contrast theme, using pure black,
 * soft grays, and a vibrant electric blue for key calls to action.
 */
function BuyCredit() {
    // Destructure necessary values from AppContext
    const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    /**
     * @description Initializes the Razorpay payment modal with the provided order details.
     * @param {object} order - The order object received from the backend.
     */
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Credits Payment',
            description: 'Credits Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (razorpayResponse) => {
                try {
                    // Send the Razorpay response directly to the backend for verification
                    const response = await axios.post(`${backendUrl}/api/user/verify-razor`, razorpayResponse, { headers: { token } });

                    if (response.data.success) {
                        // On successful verification, update user credits and show a success message
                        loadCreditsData();
                        navigate('/');
                        toast.success('Credit added successfully!');
                    } else {
                        // If backend verification fails, show an error message
                        toast.error(response.data.message || 'Verification failed. Please try again.');
                    }
                } catch (error) {
                    // Handle network or server errors during verification
                    if (error.response && error.response.data && error.response.data.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error(error.message || 'An unexpected error occurred. Please try again.');
                    }
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    /**
     * @description Handles the payment process by first checking user authentication
     * and then creating a Razorpay order via the backend.
     * @param {string} planId - The ID of the selected plan.
     */
    const paymentRazorpay = async (planId) => {
        try {
            // If the user is not authenticated, show the login modal and exit
            if (!user) {
                setShowLogin(true);
                return;
            }

            // Create a payment order on the backend
            const response = await axios.post(`${backendUrl}/api/user/pay-razor`, { planId }, { headers: { token } });

            if (response.data.success) {
                // If the order is created successfully, initialize the Razorpay payment modal
                initPay(response.data.order);
            } else {
                // If the backend fails to create an order, show an error message
                toast.error(response.data.message || 'Payment failed. Please try again.');
            }
        } catch (error) {
            // Handle network or server errors during order creation
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please check the console.');
            }
        }
    };

    return (
        <div>
            <motion.div
                className='min-h-[80vh] text-center pt-14 mb-10'
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Section title and subtitle */}
                <button className='border border-gray-700 text-gray-400 px-10 py-2 rounded-full mb-6'>
                    Our Plans
                </button>
                <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10 text-gray-200'>
                    Choose The Plan
                </h1>

                {/* Container for pricing plans */}
                <div className='flex flex-wrap justify-center gap-6 text-left'>
                    {plans.map((item, index) => (
                        <motion.div
                            key={index}
                            className='flex justify-center items-center flex-col bg-zinc-900 border border-zinc-800 rounded-lg py-12 px-8 text-gray-400 shadow-xl hover:scale-105 transition-all duration-500'
                            whileHover={{ y: -5 }} // Add a subtle lift animation on hover
                        >
                            <img className='w-20' src={assets.logo} alt="Logo" />
                            <p className='mt-3 mb-1 font-semibold text-blue-400'>{item.id}</p>
                            <p className='text-sm'>{item.desc}</p>

                            <p className='mt-6 text-gray-200'>
                                <span className='text-3xl font-medium'>₹ {item.price} </span>
                                <span className='text-sm text-gray-400'>/ {item.credits} Credits</span>
                            </p>

                            <button
                                onClick={() => paymentRazorpay(item.id)}
                                className='w-full bg-blue-600 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-blue-700 transition-colors'
                            >
                                {user ? 'Purchase' : 'Get Started'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <GenerateBtn message='Buy Credits For Generate More Images' />
        </div>
    );
}

export default BuyCredit;