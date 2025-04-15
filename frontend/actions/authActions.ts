"use server";
import React from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redis } from '@/lib/db';

export const checkAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return { success: false };

  const userId = `user:${user.id}`;

  const existingUser = await redis.hgetall(userId);

  if (!existingUser || Object.keys(existingUser).length === 0) {
    const imgIsNull = user.picture?.includes("gravatar");
    const image = imgIsNull ? "" : user.picture;

    await redis.hset(userId, {
      id: user.id,
      email: user.email,
      name: `${user.given_name} ${user.family_name}`,
      image,
      isActive: true, // 👈 new field here
    });
  } else {
    // Optional: update isActive if user already exists
    await redis.hset(userId, { isActive: true });
  }

  return { success: true };
};



export const setActiveStatusOffline = async (userId: string) => {
  await redis.hset(`user:${userId}`, {
    isActive: false,
  });
  console.log(`User ${userId} is now marked as offline.`);
};


export const setActiveStatusOnline = async (userId: string) => {
  await redis.hset(`user:${userId}`, {
    isActive: true,
  });
  console.log(`User ${userId} is now marked as online.`);
};