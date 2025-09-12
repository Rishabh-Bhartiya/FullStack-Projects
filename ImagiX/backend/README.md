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