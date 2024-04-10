import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';
import { moderateScale } from '@/types/theme/responsive';

export default ({
	layout,
	backgrounds,
	fonts,
	gutters,
	borders,
}: ComponentTheme) => {
	return {
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(70),
			width: moderateScale(70),
		},
		button: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(48),
			width: '100%',
		},
		claimBtn: {
			height: moderateScale(48),
			width: '100%',
			justifyContent: 'center',
		},
		lottieClaim: {
			...layout.fullWidth,
			aspectRatio: 16 / 9,
		},
		textInput: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...gutters.paddingHorizontal_12,
			...fonts.gray400,
			...borders.rounded_36,
			height: moderateScale(48),
			width: '100%',
		},
		circle250: {
			borderRadius: 140,
			height: 68,
			width: 68,
		},
		image24: {
			height: moderateScale(24),
			width: moderateScale(24),
		},
		image48: {
			height: moderateScale(48),
			width: moderateScale(48),
		},
		card: {
			...gutters.padding_16,
			...gutters.marginBottom_16,
			...borders.rounded_8,
			...backgrounds.card,
		},
		separator: {
			...borders.w_1,
			...borders.gray200,
			width: '80%',
			borderStyle: 'dashed',
		},
	} as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
