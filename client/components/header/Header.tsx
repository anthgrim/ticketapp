import { CurrentUser } from '@/types'
import React from 'react'

interface Props {
  currentUser: CurrentUser | null
}

const Header = ({ currentUser }: Props) => {
  return <div>Hello! {currentUser?.email}</div>
}

export default Header
