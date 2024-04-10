import { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewProps } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/theme';
import { wait } from '@/utils/helpers';

const COLOR_ACTIVE_TIME = 2000;

interface ICopyButtonProps {
	customStyle?: StyleProp<ViewProps>;
	value: string;
}

function CopyButton({ customStyle, value }: ICopyButtonProps) {
	const { colors } = useTheme();
	const baseColor = colors.purple500;
	const activeColor = colors.red500;

	const [color, setColor] = useState<string>(baseColor);
	const scale = useSharedValue(1);

	const isSameColor = (inputColor: string, currentColor: string): boolean => {
		return inputColor === currentColor;
	};

	useEffect(() => {
		if (isSameColor(color, activeColor)) {
			scale.value = withSequence(withSpring(1.15), withSpring(1));
		}
	}, [color]);

	const rStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
	}));

	return (
		<Animated.View style={rStyle}>
			<TouchableOpacity
				testID="copy-button"
				disabled={isSameColor(color, activeColor)}
				style={customStyle}
				onPress={() => {
					Clipboard.setString(value);
					setColor(activeColor);
					void wait(COLOR_ACTIVE_TIME).then(() => {
						setColor(baseColor);
					});
				}}
			>
				<Svg
					width={18}
					height={20}
					viewBox="0 0 18 20"
					fill={color}
					testID="svg-copy"
				>
					<Path
						d="M6.23 20h9.231A2.548 2.548 0 0018 17.442V6.279a2.548 2.548 0 00-2.539-2.558h-9.23a2.548 2.548 0 00-2.539 2.558v11.163A2.548 2.548 0 006.231 20z"
						fill={color}
					/>
					<Path
						d="M2.538 0h9.231c.673 0 1.319.27 1.795.75s.743 1.13.744 1.808v11.163a2.57 2.57 0 01-.744 1.809 2.53 2.53 0 01-1.795.75H2.54a2.53 2.53 0 01-1.795-.75A2.57 2.57 0 010 13.72V2.558C0 1.88.268 1.23.744.75A2.53 2.53 0 012.538 0zm9.231 14.884c.306 0 .6-.123.816-.341a1.17 1.17 0 00.338-.822V2.558a1.17 1.17 0 00-.338-.821 1.151 1.151 0 00-.816-.342H2.54c-.307 0-.6.124-.816.341a1.17 1.17 0 00-.339.822v11.163c0 .308.123.604.339.822.216.218.51.34.815.34h9.231z"
						fill={color}
					/>
				</Svg>
			</TouchableOpacity>
		</Animated.View>
	);
}

CopyButton.defaultProps = {
	customStyle: {},
};

export default CopyButton;
