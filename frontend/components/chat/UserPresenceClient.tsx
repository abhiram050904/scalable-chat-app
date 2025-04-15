'use client'

import { useEffect } from 'react'
import { setActiveStatusOnline, setActiveStatusOffline } from '../../actions/authActions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const UserPresenceClient = () => {
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    if (!user) return

    const goOnline = async () => {
      await setActiveStatusOnline(user.id)
    }

    const goOffline = async () => {
      await setActiveStatusOffline(user.id)
    }

    goOnline()

    window.addEventListener('beforeunload', goOffline)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') goOffline()
      else if (document.visibilityState === 'visible') goOnline()
    })

    return () => {
      goOffline()
      window.removeEventListener('beforeunload', goOffline)
    }
  }, [user])

  return null
}

export default UserPresenceClient
