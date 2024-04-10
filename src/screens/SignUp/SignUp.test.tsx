import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import i18n from '@/translations';
import SignUp from '.';
import { createStore, StoreProvider } from 'easy-peasy';
import { model } from '@/stores/models';

describe('Example screen should render correctly', () => {
	let storage: MMKV;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: Infinity,
			},
			mutations: {
				gcTime: Infinity,
			},
		},
	});

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the user change the theme', () => {
		const store = createStore(model);

		const component = (
			<StoreProvider store={store}>
				<ThemeProvider storage={storage}>
					<I18nextProvider i18n={i18n}>
						<QueryClientProvider client={queryClient}>
							<SignUp />
						</QueryClientProvider>
					</I18nextProvider>
				</ThemeProvider>
			</StoreProvider>
		);

		render(component);

		expect(storage.getString('theme')).toBe('default');

		const button = screen.getByTestId('signup-change-theme');
		expect(button).toBeDefined();
		fireEvent.press(button);
		expect(storage.getString('theme')).toBe('dark');
	});

	test('the user signIn', async () => {
		const store = createStore(model);

		const component = (
			<StoreProvider store={store}>
				<ThemeProvider storage={storage}>
					<I18nextProvider i18n={i18n}>
						<QueryClientProvider client={queryClient}>
							<SignUp />
						</QueryClientProvider>
					</I18nextProvider>
				</ThemeProvider>
			</StoreProvider>
		);

		render(component);
		expect(store.getState().userModel.user).not.toBeDefined();
		const button = screen.getByTestId('google-signin');
		expect(button).toBeDefined();
		await act(() => {
			fireEvent.press(button);
		});

		await waitFor(() => {
			expect(store.getState().userModel.user).toBeDefined();
		});
	});
});
