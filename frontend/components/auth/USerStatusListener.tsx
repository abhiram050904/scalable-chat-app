// client-side (React)
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher"; 

export const useUserStatusListener = (onStatusChange: (userId: string, isActive: boolean) => void) => {
  useEffect(() => {
    const channel = pusherClient.subscribe("presence-users");

    channel.bind("user-status-changed", (data: { userId: string; isActive: boolean }) => {
      onStatusChange(data.userId, data.isActive);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [onStatusChange]);
};
