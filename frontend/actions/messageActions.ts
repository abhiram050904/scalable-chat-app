"use server"

import { Message } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type SendMessageActionArgs={
    content:string;
    recieverId:string;
    Messagetype:"text" | "image";
}

export async function sendMessageAction({content,Messagetype,recieverId}:SendMessageActionArgs) {

    const {getUser}=getKindeServerSession()
    const user=await getUser()

    if(!user)return {success:false ,message:"user not authenticated"}
    
    const senderId=user.id;

    const conversationId=`conversation:${[senderId,recieverId].sort().join(":")}`


    const conversationExists=await redis.exists(conversationId)

    if(!conversationExists){
        await redis.hset(conversationId,{
            participant1:senderId,
            participant2:recieverId
        })

        await redis.sadd(`user:${senderId}:conversations`,conversationId)
        await redis.sadd(`user:${recieverId}:conversations`,conversationId)
    }


    const messageId=`message:${Date.now()}:${Math.random().toString(36).substring(2,9)}`

    const timestamp=Date.now()

    await redis.hset(messageId,{
        senderId,
        content,
        timestamp,
        Messagetype
    })

    await redis.zadd(`${conversationId}:messages`, {
        score: timestamp,
        member: JSON.stringify(messageId),
      })

      return {Success:true,conversationId,messageId}
}


export async function getMessages(selectedUserId:string,currentUserId:string) {
    const conversationId=`conversation:${[selectedUserId,currentUserId].sort().join(":")}`
    const messageIds=await redis.zrange(`${conversationId}:messages`,0,-1)

    if(messageIds.length === 0) return []

    const pipeline=redis.pipeline()
    messageIds.forEach((messageId)=>pipeline.hgetall(messageId as string))
    const messages=(await pipeline.exec()) as Message[]
    return messages
}