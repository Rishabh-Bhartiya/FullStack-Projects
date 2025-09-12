import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const { chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token } = useAppContext();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logout Successfully')
  }

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
      const confirm = window.confirm('Are You Sure You Want To Delete This Chat ?')
      if (!confirm) return;
      const { data } = await axios.post('/api/chat/delete', { chatId }, { headers: { Authorization: token } })
      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUsersChats()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 bg-white/70 dark:bg-black/70 border-r border-gray-200 dark:border-gray-800 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-10 ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="w-fit flex justify-center gap-5 items-center rounded-2xl">
        <img
          src={theme === "dark" ? assets.logo_full : assets.logo_full}
          alt="Logo"
          className="dark:bg-white dark:rounded-xl w-12 max-w-48"
        />
        <span className="font-bold text-2xl">Neuro<span className="text-blue-600">Chat</span></span>
      </div>

      {/* New Chat Button */}
      <button onClick={createNewChat} className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-sm rounded-md cursor-pointer">
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 focus-within:ring-1 focus-within:ring-blue-500">
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="w-4 not-dark:invert"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
          className="text-xs placeholder:text-gray-400 outline-none w-full bg-transparent text-gray-800 dark:text-gray-200"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                .toLowerCase()
                .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              key={chat._id}
              className="p2 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer flex justify-between items-center group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <p className="truncate w-full text-gray-800 dark:text-gray-200">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                onClick={e => toast.promise(deleteChat(e, chat._id), { loading: "Deleting..." })}
                src={assets.bin_icon}
                alt="Delete Icon"
                className="w-4 cursor-pointer not-dark:invert dark:invert-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-800 dark:text-gray-200"
      >
        <img
          src={assets.gallery_icon}
          alt="Community Icon"
          className="w-4.5 not-dark:invert dark:invert-0"
        />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchase Options */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <img
          src={assets.diamond_icon}
          alt="Community Icon"
          className="w-4.5 dark:invert"
        />
        <div className="flex flex-col text-sm">
          <p className="text-gray-800 dark:text-gray-200">Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Purchase Credits To Use NeuroChat
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <img
            src={assets.theme_icon}
            alt="Theme Icon"
            className="w-4 not-dark:invert"
          />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-600 transition-all "></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <img
          src={assets.user_icon}
          alt="User Icon"
          className="w-7 rounded-full"
        />
        <p className="flex-1 text-sm text-gray-800 dark:text-gray-200 truncate">
          {user ? user.name : "Login Your Account"}
        </p>
        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            className="h-5 cursor-pointer not-dark:invert dark:invert opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        alt="Close Icon"
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert dark:"
      />
    </div>
  );
}

export default SideBar;