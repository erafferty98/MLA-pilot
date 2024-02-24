'use client'

import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Journal from '../components/Journal'
import Progress from '../components/Progress'
import HomepageGrid from '../components/HomepageGrid'

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
      <HomepageGrid />
    </>
  )
}
export default HomePage
