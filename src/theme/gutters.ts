import { config } from '@/theme/_config';

import type { Gutters } from '@/types/theme/gutters';
import {
	moderateScale,
	ResponsiveHeight,
	ResponsiveWidth,
} from '@/types/theme/responsive';
import type { ViewStyle } from 'react-native';

export const generateGutters = (): Gutters => {
	return config.gutters.reduce((acc, curr) => {
		return Object.assign(acc, {
			[`margin_${curr}`]: {
				margin: moderateScale(curr),
			},
			[`marginBottom_${curr}`]: {
				marginBottom: ResponsiveHeight(curr),
			},
			[`marginTop_${curr}`]: {
				marginTop: ResponsiveHeight(curr),
			},
			[`marginRight_${curr}`]: {
				marginRight: ResponsiveWidth(curr),
			},
			[`marginLeft_${curr}`]: {
				marginLeft: ResponsiveWidth(curr),
			},
			[`marginVertical_${curr}`]: {
				marginVertical: ResponsiveHeight(curr),
			},
			[`marginHorizontal_${curr}`]: {
				marginHorizontal: ResponsiveWidth(curr),
			},
			[`padding_${curr}`]: {
				padding: moderateScale(curr),
			},
			[`paddingBottom_${curr}`]: {
				paddingBottom: ResponsiveHeight(curr),
			},
			[`paddingTop_${curr}`]: {
				paddingTop: ResponsiveHeight(curr),
			},
			[`paddingRight_${curr}`]: {
				paddingRight: ResponsiveWidth(curr),
			},
			[`paddingLeft_${curr}`]: {
				paddingLeft: ResponsiveWidth(curr),
			},
			[`paddingVertical_${curr}`]: {
				paddingVertical: ResponsiveHeight(curr),
			},
			[`paddingHorizontal_${curr}`]: {
				paddingHorizontal: ResponsiveWidth(curr),
			},
		});
	}, {} as Gutters);
};

export const staticGutterStyles = {} as const satisfies Record<
	string,
	ViewStyle
>;
