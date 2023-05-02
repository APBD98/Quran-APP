import React, { ReactNode } from 'react'
import Header from './Header'

interface LayoutProps{
    children:ReactNode
}

const Layout = (props: LayoutProps) => {
    const {children} = props
  return (
    <div className='w-full h-screen'>
      <Header/>
        <main>{children}</main>
    </div>
  )
}

export default Layout