import { useRef } from 'react';
import { ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AnimatedButtonProps {
	onPress: () => void;
	customStyle?: ViewStyle | ViewStyle[];
}

function ProfileButton({ onPress, customStyle }: AnimatedButtonProps) {
	const animationRef = useRef<LottieView>(null);
	const { colors, components } = useTheme();

	return (
		<TouchableOpacity onPress={onPress} style={customStyle}>
			<LottieView
				ref={animationRef}
				source={require('@/theme/assets/images/profile.json')}
				autoPlay
				loop={false}
				colorFilters={[
					{ keypath: 'Shield', color: colors.purple500 },
					{ keypath: 'Person', color: colors.purple500 },
				]}
				style={components.image48}
			/>
		</TouchableOpacity>
	);
}

ProfileButton.defaultProps = {
	customStyle: {},
};

export default ProfileButton;
