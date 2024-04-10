import { ViewStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import Brand from '.';
import { moderateScale } from '@/types/theme/responsive';

describe('Brand component should render correctly', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('with default props if not precises (height: 200, width: 200, resizeMode: "contain")', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<Brand />
			</ThemeProvider>
		);

		render(component);

		const wrapper = screen.getByTestId('brand-img-wrapper');
		const img = screen.getByTestId('brand-img');

		const brandHeight: number = moderateScale(200 as number);
		const brandWidth: number = moderateScale(200 as number);

		// Props set correctly
		expect((wrapper.props.style as ViewStyle).height).toBe(brandHeight);
		expect((wrapper.props.style as ViewStyle).width).toBe(brandWidth);
		expect(img.props.resizeMode).toBe('contain');
	});

	test('with passed props', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<Brand height={100} width={100} mode="cover" />
			</ThemeProvider>
		);

		render(component);

		const wrapper = screen.getByTestId('brand-img-wrapper');
		const img = screen.getByTestId('brand-img');

		const brandHeight: number = moderateScale(100 as number);
		const brandWidth: number = moderateScale(100 as number);

		expect((wrapper.props.style as ViewStyle).height).toBe(brandHeight);
		expect((wrapper.props.style as ViewStyle).width).toBe(brandWidth);
		expect(img.props.resizeMode).toBe('cover');
	});
});
