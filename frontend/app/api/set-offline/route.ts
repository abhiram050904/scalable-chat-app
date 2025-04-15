import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redis } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'

export async function POST() {
	try {
		const { getUser } = getKindeServerSession()
		const user = await getUser()

		if (!user) return new NextResponse('Unauthorized', { status: 401 })

		await redis.hset(`user:${user.id}`, { isActive: false })

		// ✅ This is critical: make sure to broadcast it
		await pusherServer.trigger('presence-users', 'user-status-changed', {
			userId: user.id,
			isActive: false,
		})

		return NextResponse.json({ success: true })
	} catch (err) {
		console.error('[SET_OFFLINE_ERROR]', err)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
