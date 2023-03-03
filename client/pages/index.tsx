import React from 'react'
import { NextPageContext } from 'next'
import { buildClient } from '@/utils/build-client'

const Home = ({ currentUser }: any) => {
  console.log(currentUser)
  return <div>index</div>
}

Home.getInitialProps = async (context: NextPageContext) => {
  const axiosInstance = buildClient(context)
  const { data } = await axiosInstance.get('/api/users/currentuser')
  return data
}

export default Home
