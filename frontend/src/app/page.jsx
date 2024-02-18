'use client'

import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useRouter } from 'next/navigation'
import logo from '../img/CFG_logo.png'

const HomePage = () => {
  const router = useRouter()
  const { isLoggedIn } = useContext(AuthContext)
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/statistics')
    }
  }),
    [isLoggedIn]
  return <p></p>
}
export default HomePage
