import { Dropdown, MenuProps } from 'antd';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NewChatModal from './new-chat-modal';

const ChatHeader = () => {
	const [showChatModal, setShowChatModal] = useState<boolean>(false);
	const router = useRouter();
	const items: MenuProps['items'] = [
		{
			label: 'New Chat',
			key: '1',
			onClick: () => setShowChatModal(true),
		},
		{
			label: 'New Group',
			key: '2',
			onClick: () => router.push('/groups/create-group'),
		},
	];
	return (
		<div>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl text-gray-500 font-bold uppercase'>My Chats</h1>
				<Dropdown.Button className='w-max' size='small' menu={{ items }}>
					New
				</Dropdown.Button>
			</div>

			<input
				type='text'
				placeholder='Search cats ...'
				className='bg-blue-100/30 w-full border border-gray-300 border-solid outline-none rounded-md px-3 h-14 focus:outline-none focus:border-primary'
			/>

			{showChatModal && (
				<NewChatModal
					setShowChatModal={setShowChatModal}
					showChatModal={showChatModal}
				/>
			)}
		</div>
	);
};

export default ChatHeader;
