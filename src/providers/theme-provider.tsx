'use client';
import { ConfigProvider } from 'antd';
import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<ConfigProvider theme={{ token: { colorPrimary: '#31304D' } }}>
				{children}
			</ConfigProvider>
		</div>
	);
};

export default ThemeProvider;
