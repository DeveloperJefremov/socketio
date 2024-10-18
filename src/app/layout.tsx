import LayoutProvider from '@/providers/layout-provider';
import ReduxProvider from '@/providers/redux-provider';
import ThemeProvider from '@/providers/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import 'remixicon/fonts/remixicon.css';
import './globals.css';
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body>
					<ThemeProvider>
						<ReduxProvider>
							<LayoutProvider>{children}</LayoutProvider>
						</ReduxProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
