import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)
    const navigate = useNavigate()

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })

            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt = "sky") => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } });

            if (data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                // This block handles both data.success === false and axios errors
                // because the catch block now calls this logic.
                toast.error(data.message);
                loadCreditsData();
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {

            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } });

            // This is the key change: when an error occurs,
            // we assume the data object would have had success: false.
            // We can mimic the same logic here or handle it based on the error.

            // A simple way to handle this is to use a generic error message
            // and then apply the same credit balance and navigation logic.
            if(data.creditBalance <= 0)
            loadCreditsData();

            // Note: creditBalance might not be available in an error object.
            // You would need to decide how to handle this case.
            // If you always want to check for zero credits on error,
            // you'd need the credit balance from another source, or
            // you could just assume the user might need more credits.
            // For simplicity, let's just navigate.
            navigate('/buy');
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
        toast("Logout Successfully")
    }

    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider
