import React, { useEffect, useRef, useState } from 'react'
import {
  IoPlaySharp,
  IoPauseSharp
} from 'react-icons/io5';


interface Props{
    id:string,
    ayat:string,
    verse_key:string,
    tranlateAyat:string,
    src:string,
    audioRef:any,
    idPlayed:string,
    isPause:boolean,
    playAyah: () => void,
    endAudio: () => void,
    handleStop: () => void

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
      
      <div className='self-start mb-2 mr-5'>
       
        {
          props.idPlayed == props.verse_key  ? 
          <div className=' text-center w-32 h-16 pt-5'>
            <audio 
            src={props.src} 
            ref={props.audioRef} 
            onEnded={props.endAudio}
            autoPlay></audio>
            <button className='text-green-500 text-2xl' onClick={props.handleStop}>
              {
                props.isPause? 
                <IoPlaySharp/>
                :
                <IoPauseSharp/> 
              }
              </button> 
          </div>
          :
          <div className=' text-center group w-32 h-16 pt-5'>
            <button className='text-green-500 text-2xl' onClick={props.playAyah}> <IoPlaySharp/></button>
          </div>
          
        }
        
      </div>
    </div>
    </>
  )
}

export default ListPerAyah