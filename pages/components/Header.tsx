import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import bg from '../../public/basmalah.png'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
    weight:'400', 
    subsets:['cyrillic'], 
    style:'normal'})


const Header = () => {
    
  return (
    <>
    <div className='flex items-center justify-center border-b-2 border-green-500'>
        <Image
        src={bg}
        alt='basmalah image'
        width={400}
        height={400}
        />
    </div>

    {/* <div className='w-full h-32 flex items-center justify-center gap-6 uppercase text-2xl lg:text-3xl text-green-700 border-b-2 border-green-500 group '>
        <Link href="" className={`${playfair.className} hover:text-green-500 hover:border-b-4 hover:border-green-500 hover:scale-110 transition-all duration-200`}>Qur'an</Link>
        <h1 className='text-3xl'>|</h1>
        <Link href="" className={`${playfair.className}  hover:text-green-500 hover:border-b-4 hover:border-green-500 hover:scale-110 transition-all duration-200`}>Doa-doa</Link>        
    </div> */}
    </>
  )
}

export default Header