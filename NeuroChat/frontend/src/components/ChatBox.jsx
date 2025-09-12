import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

function ChatBox() {

  const containerRef = useRef(null)
  const { selectedChat, theme, user, axios, token, setUser } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!user) return toast('Login Your Account')
      setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: Date.now(), isImage: false }])
      const { data } = await axios.post(`/api/message/${mode}`, { chatId: selectedChat._id, prompt, isPublished }, { headers: { Authorization: token } })

      if (data.success) {
        setMessages(prev => [...prev, data.reply])

        // Decrease The Credits
        if (mode === 'image') {
          setUser(prev => ({ ...prev, credits: prev.credits - 2 }))
        } else {
          setUser(prev => ({ ...prev, credits: prev.credits - 1 }))
        }
      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
      }
    } catch (error) {

      toast.error(error.response.data.message)
    } finally {
      setPrompt('')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>

            {/* Logo */}
            <div className="w-fit flex justify-center gap-2 items-center rounded-2xl">
              <img
                src={theme === "dark" ? assets.logo_full : assets.logo_full}
                alt="Logo"
                className="dark:bg-white dark:rounded-3xl w-24 max-w-48"
              />
              <span className="font-bold text-4xl">Neuro<span className="text-blue-600">Chat</span></span>
            </div>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-blue-500'>Ask Me Anything.</p>
          </div>
        )}

        {messages.map((message, index) => <Message key={index} message={message} />)}

        {/* Loading Animation */}
        {
          loading && <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-blue-500 animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-blue-500 animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-blue-500 animate-bounce'></div>
          </div>
        }

      </div>

      {mode === 'image' && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs text-gray-600 dark:text-gray-300'>Publish Generated Image To Community</p>
          <input
            type="checkbox"
            className='cursor-pointer'
            checked={isPublished}
            onChange={(e) => { setIsPublished(e.target.checked) }}
          />
        </label>
      )}

      {/* Prompt Input Box */}
      <form onSubmit={onSubmit} className='bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-full w-full max-w-2xl p-2.5 m-auto flex gap-3 items-center shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500'>
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm py-1 pl-3 pr-2 outline-none bg-gray-100 dark:bg-gray-900 dark:text-gray-300 rounded-full border border-transparent'>
          <option className='dark:bg-gray-950 dark:text-gray-200' value="text">Text</option>
          <option className='dark:bg-gray-950 dark:text-gray-200' value="image">Image</option>
        </select>
        <input
          required
          type="text"
          value={prompt}
          placeholder='Type Your Prompt Here...'
          onChange={(e) => setPrompt(e.target.value)}
          className='flex-1 w-full text-sm outline-none bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white'
        />
        <button disabled={loading} className='p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'>
          <img
            className='w-5 h-5'
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="Send"
          />
        </button>
      </form>

    </div>
  )
}

export default ChatBox