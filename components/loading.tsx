import Image from "next/image"
import loaderImage from '../public/loader.png'


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className='w-full fixed bg-white left-0 h-full top-0 flex items-center justify-center gap-5'>
              <h1 className='text-green-700 text-xl animate-pulse'>Sedang memuat...</h1>
              <Image
              src={loaderImage}
              alt='loader image'
              width={100}
              height={100}
              className='animate-spin-slow'/>
        </div>
    )
  }