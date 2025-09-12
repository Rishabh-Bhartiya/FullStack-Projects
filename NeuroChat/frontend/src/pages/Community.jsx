import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

function Community() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios, token } = useAppContext()

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('/api/user/published-images', { headers: { Authorization: token } })

      if (data.success) {
        setImages(data.images)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if (loading) return <Loading />

  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>Community Images</h2>

      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((item, index) => (
            <a
              key={index}
              target='_blank'
              href={item.imageUrl}
              className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300'
            >
              <img
                className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
                src={item.imageUrl}
                alt="imageUrl"
              />
              <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300'>Created By : {item.userName}</p>
            </a>
          ))}
        </div>
      )
        :
        (
          <p className="text-gray-500 dark:text-gray-400">No Images Available.</p>
        )
      }
    </div>
  )
}

export default Community