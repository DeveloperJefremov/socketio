import { ChatState } from '@/redux/chatSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import Messages from './messages'
import NewMessage from './new-message'
import Recipient from './recipient'

function ChatArea() {
	const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

	if (!selectedChat) {
		return (
			<div className='flex flex-1 flex-col justify-center items-center h-full'>
				<img src='/chatlogo.webp' alt='chat logo' className='h-60' />
				<span className='font-semibold text-gray-600 text-sm'>
					Select a chat to start messaging...
				</span>
			</div>
		);
	}

	return (
		selectedChat && (
			<div className='flex-1 flex flex-col justify-between'>
				<Recipient />
				<Messages />
				<NewMessage />
			</div>
		)
	);
}

export default ChatArea;
