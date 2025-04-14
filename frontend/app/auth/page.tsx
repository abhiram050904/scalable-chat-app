import Image from 'next/image'
import React from 'react'
import img1 from '../../public/redis-logo.svg'
import img2 from '../../public/logo.png'
import img3 from '../../public/hero-right.png'
import AuthButtons from '@/components/ui/auth/AuthButtons'
const page = () => {
  return (
    <div className='flex h-screen w-full'>
      <div className='flex-1 flex overflow-hidden dark:bg-[#651c2b55] light:bg-[#651c2b] relative justify-center items-center'>
        <Image src={img1} alt='logo' className='absolute -left-1/4 opacity-25 -bottom-52 lg:scale-125 xl:scale-100 scale-[2]'/>
        <div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold'>
        <Image src={img2} alt='img' width={763} height={173} className='mt-20 w-[420px] z-0 pointer-events-none select-none'/>

        <p className='text-2xl md:text-3xl text-balance z-10'>
          The <span className='bg-red-500 px-2 font-bold text-white'>Ultimate</span>
        </p>

        <p className='text-2xl md:text-3xl mb-32 text-balance z-10'>
        You <span className='bg-gray-500/90 font-bold px-2 text-white'>Need to</span>build
        </p>

        <AuthButtons/>
        </div>
      </div>
      <div className='flex-1 relative overflow-hidden justify-center items-center hidden md:flex '>

        <Image src={img3} alt='img' fill className='object-cover dark:opacity-60 opacity-90 pointer-events-none select-none h-full'/>
      </div>
    </div>
  )
}

export default page
