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