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
            if (error.response.data.message === 'Insufficient credits.') {
                toast.error(error.response.data.message)
                navigate('/buy')
            } else if (error.response.data.message === 'Generating This Type of Image is Against Our Policies') {
                toast.error(error.response.data.message)
            } else {
                toast.error('Internal Server Error')
            }
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
