'use client'

import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Journal from '../components/Journal'

const HomePage = () => {
  const router = useRouter()
  const { isLoggedIn } = useContext(AuthContext)
  useEffect(() => {
    // if (!isLoggedIn) {
    //   router.push('/login')
    // }
  }),
    [isLoggedIn]
  return (
    <>
      <Header />
      <Journal />
    </>
  )
}
export default HomePage
