import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelectedUser } from "@/store/UseSelectedUser";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/actions/messageActions";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Image from "next/image";

const MessageList = () => {
  const { selectedUser } = useSelectedUser();
  const { user: currentUser, isLoading: isUserLoading } = useKindeBrowserClient();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    queryFn: async () => {
      if (selectedUser && currentUser) {
        return await getMessages(selectedUser?.id, currentUser?.id);
      }
    },
    enabled: !!selectedUser && !!currentUser && !isUserLoading,
  });

  
  
  // Scroll to the bottom of the message container when new messages are added
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageContainerRef} className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <AnimatePresence>
        {!isMessagesLoading &&
          messages?.map((message) => (
            <motion.div
              key={message.id} // Use message id as the key to avoid issues with reordering
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message?.senderId === currentUser?.id ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message?.senderId === selectedUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedUser?.image}
                      alt="User Image"
                      className="border-2 border-white rounded-full"
                    />
                  </Avatar>
                )}
                {message.Messagetype === "text" ? (
                  <span className="bg-accent p-3 rounded-md max-w-xs">{message.content}</span>
                ) : (
                  <img
                    src={message.content}
                    alt="Message Image"
                    className="border p-2 rounded h-40 md:h-52 object-cover"
                  />
                )}

                {message.senderId === currentUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={currentUser?.picture || "/user-placeholder.png"}
                      alt="User Image"
                      className="border-2 border-white rounded-full"
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}

        {isMessagesLoading && (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
