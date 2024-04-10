import {
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import CopyButton from '.';
import Clipboard from '@react-native-clipboard/clipboard';

describe('Brand component should render correctly', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	const value = 'testValue';

	test('can not press after pressed', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<CopyButton value={value} />
			</ThemeProvider>
		);

		render(component);

		const button = screen.getByTestId('copy-button');

		// Attempt to press the button again
		expect(button.props.enabled).toBe(true);
		fireEvent.press(button);
		expect(button.props.enabled).toBe(false);
	});

	test('copy with value props', async () => {
		const component = (
			<ThemeProvider storage={storage}>
				<CopyButton value={value} />
			</ThemeProvider>
		);

		render(component);

		const button = screen.getByTestId('copy-button');
		expect(button).toBeDefined();
		fireEvent.press(button);

		await waitFor(() => {
			expect(Clipboard.setString).toHaveBeenCalledWith(value);
		});
	});

	test('changes button color on press', () => {
		storage.set('theme', 'dark');

		const component = (
			<ThemeProvider storage={storage}>
				<CopyButton value={value} />
			</ThemeProvider>
		);

		render(component);

		const button = screen.getByTestId('copy-button');
		const svg = screen.getByTestId('svg-copy');
		expect(svg.props.fill).toBe('#A6A4F0');
		fireEvent.press(button);
		expect(svg.props.fill).toBe('#C13333');
	});
});
