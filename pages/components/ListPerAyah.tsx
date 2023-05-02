import React from 'react'

interface Props{
    id:number,
    ayat:string,
    verse_key:string,
    tranlateAyat:string,
    src:string
}

const ListPerAyah = (props:Props) => {
  return (
    <>
    <div className={`text-right`}>
        <p className={`font-Noor text-2xl p-5`} style={{direction:'rtl'}}> {props.ayat} <span className='p-2 mr-5 text-sm border-b-[1px] border-green-500 rounded-full'>{parseInt(props.verse_key.split(':')[1]).toLocaleString('ar-u-nu-arab')}</span></p>  
    </div>
    <div className='flex flex-col md:flex-row items-start justify-between'>
      <div className='flex items-center'>
        <div className='w-6 h-6 border-r-[1px] border-green-700 flex items-center justify-center ml-5 pr-2'>
        <p className='text-md text-green-700 p-1'>{props.verse_key.split(':')[1]}</p>                       
        </div>
        <p className='p-5 text-sm text-green-700'>{props.tranlateAyat.replaceAll(/<([^</> ]+)[^<>]*?>[^<>]*?<\/\1> */gi,'')}</p>
      </div>
      
      <div className='self-center mb-2'>
        <audio controls>
            <source src={props.src} type='audio/mp3'/>
        </audio>
      </div>
    </div>
    </>
  )
}

export default ListPerAyah