'use client'
import React from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePreferences } from '@/store/usePreferences'
import {useSound} from 'use-sound'
// import sound1 from '../../public/sounds/mouse-click.mp3'
const PreferencesTab = () => {
    const { setTheme } = useTheme()

     const {soundEnabled,setSoundEnabled}=usePreferences()
     const [playMouseClick]=useSound('/sounds/mouse-click.mp3')
     const [playSoundOn]=useSound('/sounds/sound-on.mp3',{volume:0.3})
     const [playSoundOff]=useSound('/sounds/sound-off.mp3',{volume:0.3})
    return (
        <div className='flex flex-wrap gap-2 px-1 md:px-2 py-2 bg-muted rounded-xl shadow-sm'>
            <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => {
                    setTheme('light');
                    if (soundEnabled) playMouseClick();
                  }}
                className='hover:bg-yellow-100 dark:hover:bg-yellow-200 transition-colors duration-200'
                title='Light Mode'
            >
                <SunIcon className='size-[1.2rem] text-muted-foreground' />
            </Button>
            <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => {setTheme('dark')
                    if (soundEnabled) playMouseClick();}
                }
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
  onClick={() => {
    soundEnabled ? playSoundOff() : playSoundOn()
    setSoundEnabled(!soundEnabled)
  }}
>
  {
    soundEnabled ? (
      <Volume2 className='size-[1.2rem] text-muted-foreground' />
    ) : (
      <VolumeX className='size-[1.2rem] text-muted-foreground' />
    )
  }
</Button>
        </div>
    )
}

export default PreferencesTab
