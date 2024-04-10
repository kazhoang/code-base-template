import { useTheme } from '@/theme';
import {
	BlurMask,
	Canvas,
	RoundedRect,
	SweepGradient,
	vec,
} from '@shopify/react-native-skia';
import { useEffect } from 'react';
import {
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

type BackgroundGradientProps = {
	width: number;
	height: number;
};

function BackgroundGradient({ width, height }: BackgroundGradientProps) {
	const canvasPadding = 40;
	const rValue = useSharedValue(0);
	const { colors } = useTheme();

	useEffect(() => {
		rValue.value = withRepeat(withTiming(10, { duration: 2000 }), -1, true);
	}, [rValue]);

	return (
		<Canvas
			style={{
				width: width + canvasPadding,
				height: height + canvasPadding,
			}}
		>
			<RoundedRect
				x={canvasPadding / 2}
				y={canvasPadding / 2}
				width={width}
				height={height}
				color="white"
				r={20}
			>
				<SweepGradient
					c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
					colors={[
						colors.gradientBackground1,
						colors.gradientBackground2,
						colors.gradientBackground3,
						colors.gradientBackground1,
					]}
				/>
				<BlurMask blur={rValue} />
			</RoundedRect>
		</Canvas>
	);
}

export default BackgroundGradient;
