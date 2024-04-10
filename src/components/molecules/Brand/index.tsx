import { View, DimensionValue } from 'react-native';

import Logo from '@/theme/assets/images/logo.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import { moderateScale } from '@/types/theme/responsive';

type Props = {
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function Brand({ height, width, mode }: Props) {
	const { layout } = useTheme();

	if (!isImageSourcePropType(Logo)) {
		throw new Error('Image source is not valid');
	}

	const brandHeight: number = moderateScale(height as number);
	const brandWidth: number = moderateScale(width as number);

	return (
		<View
			testID="brand-img-wrapper"
			style={{ height: brandHeight, width: brandWidth }}
		>
			<ImageVariant
				testID="brand-img"
				style={[layout.fullHeight, layout.fullWidth]}
				source={Logo}
				resizeMode={mode}
			/>
		</View>
	);
}

Brand.defaultProps = {
	height: 200,
	width: 200,
	mode: 'contain',
};

export default Brand;
