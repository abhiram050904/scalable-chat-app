"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {LoginLink, RegisterLink} from '@kinde-oss/kinde-auth-nextjs/components'
const AuthButtons = () => {
  const [isLoading,setIsLoading]=useState(false)
  return (
    <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'>
      <RegisterLink className='flex-1' onClick={(e)=>{setIsLoading(true)}}>
      <Button disabled={isLoading} className='w-full' variant={'outline'}>Sign Up</Button>
      </RegisterLink>
      <LoginLink className='flex-1' onClick={(e)=>{setIsLoading(true)}}>
      <Button className='w-full' disabled={isLoading} variant={'default'}>Login</Button>
      </LoginLink>
        
    </div>
  )
}

export default AuthButtons
