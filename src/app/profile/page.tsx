'use client'
import React, { use, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default  function ProfilePage() {
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState("none")
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axios.get('/api/users/logout')
      router.push('/login')

    } catch (error:any) {
        console.log(error.message);
        
    } finally{
      setLoading(false)
    }
  }

  const handleData = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/me')
      console.log(response);
      setData(response.data.data._id)
      
      
    } catch (error:any) {

      console.log(error.message);
      
      
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>{loading ? "Processing" : "Profile Page"}</p>
      <h2 className='p-1 rounded bg-green-500'>{data === 'none' ? "Nothing" :<Link
      href={`profile/${data}`}
      >
      {data}
      </Link>}</h2>
      <button
      className='bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleData}
      >
      GetUser Details
      </button>
      <button
      className='bg-red-800 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleLogout}
      >
      Logout
      </button>
    </div>
  )
}

