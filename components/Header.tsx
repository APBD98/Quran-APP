import React from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
    weight:'400', 
    subsets:['cyrillic'], 
    style:'normal'})


const Header = () => {
    
  return (
    <div className='flex items-center justify-center border-b-2 border-green-500 w-full  p-10'>
      <h1 className={`text-2xl text-green-950 ${playfair.className}`}>Al-Quran</h1>
        
    </div>
  )
}

export default Header