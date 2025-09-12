import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

function Credits() {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, axios } = useAppContext()

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get('/api/credit/plan', { header: { Authorization: token } })

      if (data.success) {
        setPlans(data.plans)
      } else {
        toast.error(data.message || 'Failed To Fetch Plans.')
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post('/api/credit/purchase', { planId }, { headers: { Authorization: token } })

      if (data.success) {
        console.log(data.url)
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) return <Loading />

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>
      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`${plan._id === "pro" ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-gray-800"} border border-gray-200 dark:border-blue-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6 min-w-[300px] flex flex-col`}
          >
            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{plan.name}</h3>
              <p className='text2xl font-bold text-blue-600 dark:text-blue-400 mb-4'>${plan.price}
                <span className='text-base font-normal text-gray-600 dark:text-blue-200'>{' '} / {plan.credits} credits</span>
              </p>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-x-1'>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => toast.promise(purchasePlan(plan._id), { loading: "Processing..." })} className='mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 rounded-md transition-colors cursor-pointer'>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits