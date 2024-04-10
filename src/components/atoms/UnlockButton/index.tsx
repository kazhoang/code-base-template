import { useState, useEffect } from 'react';
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	ViewStyle,
	TextStyle,
	View,
} from 'react-native';
import { useTheme } from '@/theme';
import LottieView from 'lottie-react-native';

type UnlockButtonProps = {
	onPress: () => void;
	loading?: boolean;
	customStyle?: ViewStyle | ViewStyle[];
	textStyle?: TextStyle;
	timeUnlock?: number | Date; // assuming timeUnlock is in seconds
};

function UnlockButton(props: UnlockButtonProps) {
	const { components, fonts, backgrounds, colors, layout } = useTheme();
	const {
		onPress,
		loading = false,
		customStyle,
		textStyle,
		timeUnlock,
	} = props;

	const [currentTime, setCurrentTime] = useState<number>(Date.now());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const renderButtonText = () => {
		if (timeUnlock instanceof Date) {
			const differenceInSeconds = Math.round(
				(timeUnlock.getTime() - currentTime) / 1000,
			);
			if (differenceInSeconds <= 0) {
				return 'Claim';
			}
			const minutes = Math.floor(differenceInSeconds / 60);
			const seconds = differenceInSeconds % 60;
			return `Next claim unlock after ${
				minutes < 10 ? `0${minutes}` : minutes
			}:${seconds < 10 ? '0' : ''}${seconds}s`;
		}
		return 'Unlocking'; // Default text if timeUnlock is not provided
	};

	const isDisabled = (() => {
		if (typeof timeUnlock === 'number') {
			return timeUnlock > 0;
		}
		if (timeUnlock instanceof Date) {
			const now = new Date();
			return timeUnlock > now;
		}
		return false;
	})();

	if (isDisabled || loading)
		return (
			<View
				style={[
					components.button,
					components.claimBtn,
					backgrounds.gray400,
					customStyle,
				]}
			>
				{loading ? (
					<ActivityIndicator color={colors.purple100} />
				) : (
					<Text
						style={[
							fonts.size_14,
							fonts.gray800,
							fonts.bold,
							fonts.alignCenter,
							isDisabled && fonts.gray100,
							textStyle,
						]}
					>
						{renderButtonText()}
					</Text>
				)}
			</View>
		);

	return (
		<TouchableOpacity style={components.claimBtn} onPress={onPress}>
			<LottieView
				autoPlay
				loop
				source={require('@/theme/assets/images/button.json')}
				style={components.lottieClaim}
			/>
			<Text
				style={[
					layout.absolute,
					fonts.size_16,
					fonts.gray50,
					fonts.bold,
					fonts.alignCenter,
					// eslint-disable-next-line react-native/no-inline-styles
					{ left: '43%', top: '20%' },
				]}
			>
				Claim
			</Text>
		</TouchableOpacity>
	);
}

UnlockButton.defaultProps = {
	loading: false,
	customStyle: {},
	textStyle: {},
	timeUnlock: 0,
};

export default UnlockButton;
