import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

function Message({ message }) {

  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl rounded-tr-md max-w-2xl shadow-sm'>
            <p className='text-sm text-gray-800 dark:text-gray-200'>{message.content}</p>
            <span className='text-xs text-gray-400 dark:text-gray-500 text-right'>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img
            className='w-8 h-8 rounded-full'
            src={assets.user_icon}
            alt="User Icon"
          />
        </div>
      )
        :
        (
          <div className='flex items-start my-4 gap-2'>
            <div className='flex flex-col gap-2 p-3 px-4 max-w-2xl bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-2xl rounded-tl-md shadow-sm'>
              {message.isImage ? (
                <img
                  className='w-full max-w-md mt-2 rounded-md'
                  src={message.content}
                  alt="message.content"
                />
              )
                :
                (
                  <div className='text-sm text-gray-800 dark:text-gray-200 reset-tw'>
                    <Markdown>{message.content}</Markdown>
                  </div>
                )}
              <span className='text-xs text-gray-400 dark:text-gray-500'> {moment(message.timestamp).fromNow()}</span>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default Message