import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './translations';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import { StoreProvider } from 'easy-peasy';
import ApplicationNavigator from './navigators/Application';

import store from './stores';

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StoreProvider store={store}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider storage={storage}>
						<ApplicationNavigator />
					</ThemeProvider>
				</QueryClientProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
}

export default App;
