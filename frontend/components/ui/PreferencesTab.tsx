'use client'
import React from 'react'
import { Button } from './button'
import { MoonIcon, SunIcon, Volume2 } from 'lucide-react'
import { useTheme } from 'next-themes'

const PreferencesTab = () => {
    const { setTheme } = useTheme()

    return (
        <div className='flex flex-wrap gap-2 px-1 md:px-2 py-2 bg-muted rounded-xl shadow-sm'>
            <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => setTheme('light')}
                className='hover:bg-yellow-100 dark:hover:bg-yellow-200 transition-colors duration-200'
                title='Light Mode'
            >
                <SunIcon className='size-[1.2rem] text-muted-foreground' />
            </Button>
            <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => setTheme('dark')}
                className='hover:bg-zinc-800 transition-colors duration-200'
                title='Dark Mode'
            >
                <MoonIcon className='size-[1.2rem] text-muted-foreground' />
            </Button>
            <Button
                variant={'outline'}
                size={'icon'}
                className='hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200'
                title='Toggle Sound'
            >
                <Volume2 className='size-[1.2rem] text-muted-foreground' />
            </Button>
        </div>
    )
}

export default PreferencesTab
