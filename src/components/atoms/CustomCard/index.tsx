import { View, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import BackgroundGradient from './BackgroundGradient';
import { moderateScale, screenWidth } from '@/types/theme/responsive';

type CustomCardProps = ViewProps;

const HEIGHT = moderateScale(248);
const WIDTH = screenWidth * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

function CustomCard(props: CustomCardProps) {
	const rotateX = useSharedValue(0);
	const rotateY = useSharedValue(0);

	const { layout, colors, borders } = useTheme();
	const { children } = props;

	const gesture = Gesture.Pan()
		.onBegin(event => {
			rotateX.value = withTiming(
				interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP),
			);
			rotateY.value = withTiming(
				interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP),
			);
		})
		.onUpdate(event => {
			rotateX.value = interpolate(
				event.y,
				[0, CARD_HEIGHT],
				[10, -10],
				Extrapolation.CLAMP,
			);
			rotateY.value = interpolate(
				event.x,
				[0, CARD_WIDTH],
				[-10, 10],
				Extrapolation.CLAMP,
			);
		})
		.onFinalize(() => {
			rotateX.value = withTiming(0);
			rotateY.value = withTiming(0);
		});

	const rStyle = useAnimatedStyle(() => {
		const rotateXvalue = `${rotateX.value}deg`;
		const rotateYvalue = `${rotateY.value}deg`;

		return {
			transform: [
				{
					perspective: 300,
				},
				{ rotateX: rotateXvalue },
				{ rotateY: rotateYvalue },
			],
		};
	}, []);

	return (
		<View style={[layout.itemsCenter, layout.justifyCenter]}>
			<BackgroundGradient width={WIDTH} height={HEIGHT} />
			<GestureDetector gesture={gesture}>
				<Animated.View
					style={[
						layout.absolute,
						layout.z100,
						borders.rounded_20,
						{
							height: CARD_HEIGHT,
							width: CARD_WIDTH,
							backgroundColor: colors.dark,
						},
						rStyle,
					]}
				>
					{children}
				</Animated.View>
			</GestureDetector>
		</View>
	);
}

CustomCard.defaultProps = {
	title: '',
};

export default CustomCard;
