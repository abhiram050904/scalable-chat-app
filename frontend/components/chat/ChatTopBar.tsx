import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Info, X } from 'lucide-react';
import { useSelectedUser } from '@/store/UseSelectedUser';
import { cn } from '@/lib/utils'; // if you're using a utility for classnames

const ChatTopBar = () => {
  const { selectedUser, setSelectedUser } = useSelectedUser();

  return (
    <div className='w-full h-20 flex p-4 justify-between items-center border-b'>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <Avatar className='flex justify-center items-center'>
            <AvatarImage
              src={selectedUser?.image || "/user-placeholder.png"}
              alt='User Image'
              className='w-10 h-10 object-cover rounded-full'
            />
          </Avatar>
          {/* Status Dot */}
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
              selectedUser?.isActive ? 'bg-green-500' : 'bg-gray-400'
            )}
          />
        </div>

        <div className='flex flex-col'>
          <span className='font-medium'>{selectedUser?.name}</span>
          <span className='text-xs text-muted-foreground'>
            {selectedUser?.isActive ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className='flex gap-2'>
        <Info className='text-muted-foreground cursor-pointer hover:text-primary' />
        <X
          className='text-muted-foreground cursor-pointer hover:text-primary'
          onClick={() => {
            setSelectedUser(null);
          }}
        />
      </div>
    </div>
  );
};

export default ChatTopBar;
