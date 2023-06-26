import React from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
    weight:'400', 
    subsets:['cyrillic'], 
    style:'normal'})



interface Props{
  title: string,
  id:number,
  title_arabic:string,
  jumlah_ayat:number,
  title_indo:string


}

const Card = (props: Props) => {
  return (
    <div className='w-[90%] min-h-24 border-2 border-green-200 outline-none mx-auto rounded-xl grid grid-cols-3 grid-rows-2 items-center justify-center text-center hover:bg-green-300 text-green-900 hover:scale-x-105 hover:text-slate-800 transition-all cursor-pointer'>
      <p className='row-span-2 w-20'>{props.id}</p>
      <h1 className={`${playfair.className} text-left -m-10`}>{props.title}</h1>
      <p className={`${playfair.className} col-start-2 row-start-2 col-span-2 text-left text-sm opacity-80 -m-10`}>{props.title_indo}</p>
      <p className='font-Noor text-2xl col-start-3 row-start-1 text-right mr-5'>{props.title_arabic}</p>
      <p className={`${playfair.className} col-start-3 row-start-2 text-sm text-right mr-5`}>{props.jumlah_ayat} Ayat</p>
      
      
    </div>
  )
}

export default Card