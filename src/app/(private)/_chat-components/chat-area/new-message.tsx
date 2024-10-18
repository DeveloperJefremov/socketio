import socket from '@/config/socket-config';
import { UploadImageToFirebaseAndReturnUrl } from '@/helpers/image-upload';
import { ChatState } from '@/redux/chatSlice';
import { UserState } from '@/redux/userSlice';
import { SendNewMessage } from '@/server-actions/messages';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageSelector from './image-selector';

const NewMessages = () => {
	const [text, setText] = useState<string>('');
	const { currentUserData }: UserState = useSelector(
		(state: any) => state.user
	);
	const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
	const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
	const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState<boolean>(false);

	if (!currentUserData || !selectedChat) return null;

	const onSend = async () => {
		try {
			if (!text && !selectedImageFile) return;
			setLoading(true);

			let image = '';
			if (selectedImageFile) {
				image = await UploadImageToFirebaseAndReturnUrl(selectedImageFile);
			}

			const commonPayload = {
				text,
				image,
				socketMessageId: dayjs().unix(),
				createdAt: dayjs().toISOString(),
				updatedAt: dayjs().toISOString(),
				readBy: [],
			};

			const socketPayload = {
				...commonPayload,
				chat: selectedChat,
				sender: currentUserData,
			};

			socket.emit('send-new-message', socketPayload);

			setText('');
			setSelectedImageFile(null);
			setShowImageSelector(false);
			setShowEmojiPicker(false);
			const dbPayload = {
				...commonPayload,
				sender: currentUserData?._id!,
				chat: selectedChat?._id!,
			};
			SendNewMessage(dbPayload);
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		socket.emit('typing', {
			chat: selectedChat,
			sender: currentUserData?._id!,
			senderName: currentUserData?.name.split(' ')[0],
		});
	}, [selectedChat, text]);

	return (
		<div className='p-3 bg-gray-100 border-0 border-t border-solid border-gray-200 flex gap-5 relative'>
			<div className='flex gap-5'>
				{showEmojiPicker && (
					<div className='absolute left-5 bottom-20'>
						<EmojiPicker
							height={350}
							onEmojiClick={(emojiObject: any) => {
								setText(prevText => prevText + emojiObject.emoji);
								inputRef.current?.focus();
							}}
						/>
					</div>
				)}
				<Button
					className='border-gray-300'
					type='text'
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				>
					{!showEmojiPicker ? (
						<i className='ri-emoji-sticker-line'></i>
					) : (
						<i className='ri-keyboard-line'></i>
					)}
				</Button>
				<Button
					className='border-gray-300'
					type='text'
					onClick={() => setShowImageSelector(!showImageSelector)}
				>
					<i className='ri-folder-image-line'></i>
				</Button>
			</div>
			<div className='flex-1'>
				<input
					type='text'
					placeholder='Type a message'
					className='w-full border border-gray-300 border-solid focus:outline-none focus:border-gray-500 h-[45px] px-5'
					value={text}
					onChange={e => setText(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							onSend();
						}
					}}
					ref={inputRef}
				/>
			</div>
			<Button type='primary' onClick={onSend}>
				Send
			</Button>

			{showImageSelector && (
				<ImageSelector
					setShowImageSelector={setShowImageSelector}
					showImageSelector={showImageSelector}
					setSelectedImageFile={setSelectedImageFile}
					selectedImageFile={selectedImageFile}
					onSend={onSend}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default NewMessages;
