ImagiX: AI Image Generation Application
=======================================

**ImagiX** is a full-stack, AI-powered application that lets users turn text into stunning visual art. The platform is designed with a sleek, modern user interface, a robust and secure backend, and a pay-as-you-go credit system.

✨ **Key Features**

*   **Intuitive UI**: A clean, dark-themed interface built with **React**, **Vite**, and **Tailwind CSS**.
    
*   **Dynamic UX**: Smooth animations and transitions powered by **framer-motion**.
    
*   **AI Image Generation**: Convert your creative ideas into high-quality images from simple text prompts.
    
*   **Secure Authentication**: A seamless login and sign-up flow with token-based authentication.
    
*   **Credit System**: A straightforward credit system that allows users to generate images and track their usage.
    
*   **Secure Payments**: Integrated with **Razorpay** for a safe and reliable way to purchase credits.
    
*   **Modular Architecture**: Built with reusable components and a clear separation of concerns, making the codebase easy to understand and extend.
    

**1\. Frontend Architecture**
-----------------------------

The frontend is a single-page application (SPA) built with **React** and **Vite**. The architecture is component-driven, ensuring high reusability and maintainability.

### **Core Technologies**

*   **React**: The foundational library for building the user interface.
    
*   **Vite**: The build tool of choice, providing a fast development server and an optimized production build.
    
*   **Tailwind CSS**: A utility-first framework for a sleek, dark-themed, and responsive design.
    
*   **framer-motion**: Used for creating fluid, elegant animations and transitions.
    
*   **React Router DOM**: Manages client-side routing, creating a multi-page feel without full page reloads.
    
*   **Context API**: Centralizes application-wide state, managing user authentication, credits, and UI state.
    
*   **axios**: The HTTP client for all API interactions.
    
*   **react-toastify**: Provides non-intrusive notifications for user feedback.
    

### **Key Components and Pages**

*   **App.jsx**: The root component that defines the global layout and routing. It wraps the entire application with necessary providers.
    
*   **Home.jsx**: The main landing page, composed of several marketing-oriented sections (Header, Steps, Testimonials) to guide users.
    
*   **Result.jsx**: The core functional page for image generation. It features a dynamic state, a loading bar, and conditional rendering to show a placeholder, loading, or the final generated image.
    
*   **Login.jsx**: A conditional modal for user authentication (login/sign-up), managed via global context.
    
*   **BuyCredit.jsx**: A payment page that integrates with **Razorpay** to securely handle credit purchases.
    

**2\. Backend Architecture**
----------------------------

The backend is a **Node.js** server using **Express.js** that handles all API requests, database interactions, and secure payment processing.

### **Core Technologies**

*   **Node.js & Express.js**: The runtime and web framework for building the RESTful API.
    
*   **MongoDB & Mongoose**: The database and Object Data Modeling (ODM) for storing user data, credits, and payment information.
    
*   **JWT (JSON Web Tokens)**: Used for secure, stateless user authentication.
    
*   **Razorpay**: The payment gateway for processing payments. The backend securely handles order creation and server-side verification to prevent fraud.
    

### **Key Functionality**

*   **User Management**: APIs for user registration, login, and profile data retrieval.
    
*   **Credit System**: Endpoints for managing user credits, including deduction upon image generation and addition after a successful payment.
    
*   **Image Generation**: The primary API that receives a text prompt, communicates with an external AI model, and returns the generated image URL to the frontend.
    
*   **Secure Payment Gateway**: A two-step payment system with Razorpay to create secure orders and verify the payment signature.
    

**3\. Development & Build Process**
-----------------------------------

The project uses modern tools to streamline development and ensure code quality.

*   **Vite**: Powers a fast development server and provides an optimized production build.
    
*   **ESLint**: Enforces consistent code style and catches potential errors, with specific configurations for React Hooks.
    
*   **.env Files**: Environment variables are used to manage sensitive data like API keys and backend URLs, ensuring a secure and flexible deployment process.
    

**Tech Stack**
--------------

*   **Frontend**: React, Vite, Tailwind CSS, framer-motion, react-router-dom, Context API, react-toastify.
    
*   **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT.
    
*   **Payments**: Razorpay.
    
*   **Tools**: ESLint, Axios.