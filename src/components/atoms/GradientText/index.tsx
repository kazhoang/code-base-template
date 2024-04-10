import { useEffect } from 'react';
import { Platform, ViewStyle } from 'react-native';
import {
	Canvas,
	FontStyle,
	LinearGradient,
	Mask,
	Rect,
	Skia,
	Text as SkiaText,
	vec,
} from '@shopify/react-native-skia';
import {
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';

type GradientTextProps = {
	text: string;
	fontSize?: number;
	style?: ViewStyle;
};

function GradientText({ text, fontSize = 32, style }: GradientTextProps) {
	const { colors } = useTheme();
	const initColorLeft = colors.gradientTextStart;
	const initColorRight = colors.gradientTextEnd;
	const leftColor = useSharedValue<string>(initColorLeft);
	const rightColor = useSharedValue<string>(initColorRight);

	useEffect(() => {
		leftColor.value = withRepeat(
			withTiming(initColorRight, { duration: 2000 }),
			-1,
			true,
		);
		rightColor.value = withRepeat(
			withTiming(initColorLeft, { duration: 2000 }),
			-1,
			true,
		);
	}, []);

	const colorValues = useDerivedValue(() => {
		return [leftColor.value, rightColor.value];
	}, []);

	const familyName = Platform.select({ ios: 'Helvetica', default: 'serif' });
	const fontMgr = Skia.FontMgr.System();

	const typeface = fontMgr.matchFamilyStyle(familyName, FontStyle.Bold);
	const font = Skia.Font(typeface, fontSize);

	const { width } = font.measureText(text);
	const { height } = font.measureText(text);

	const buffer = 4;
	return (
		<Canvas
			style={[
				{
					height: height + buffer,
					width,
				},
				style,
			]}
		>
			<Mask
				mask={<SkiaText x={0} y={height - buffer} text={text} font={font} />}
			>
				<Rect width={width} height={height}>
					<LinearGradient
						start={vec(0, 0)}
						end={vec(fontSize, fontSize)}
						colors={colorValues}
					/>
				</Rect>
			</Mask>
		</Canvas>
	);
}

GradientText.defaultProps = {
	fontSize: 38,
	style: {},
};
export default GradientText;
