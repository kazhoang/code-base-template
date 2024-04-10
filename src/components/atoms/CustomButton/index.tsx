import {
	TouchableOpacity,
	View,
	Text,
	ActivityIndicator,
	Image,
	ViewStyle,
	TextStyle,
	ImageStyle,
	ImageSourcePropType,
} from 'react-native';
import { useTheme } from '@/theme';
import ImageVariant from '../ImageVariant';

type CustomButtonProps = {
	type?: 'regular' | 'circle' | 'image';
	onPress: () => void;
	loading?: boolean;
	text?: string;
	imageSource?: ImageSourcePropType;
	customStyle?: ViewStyle | ViewStyle[];
	textStyle?: TextStyle;
	imageStyle?: ImageStyle;
	positiveColor?: boolean;
	isDisabled?: boolean;
	testID?: string;
};

function CustomButton(props: CustomButtonProps) {
	const { layout, gutters, components, fonts, backgrounds } = useTheme();
	const {
		type = 'regular',
		onPress,
		loading = false,
		text,
		imageSource,
		customStyle,
		textStyle,
		imageStyle,
		positiveColor,
		isDisabled = false,
		testID,
	} = props;

	let buttonContent;

	switch (type) {
		case 'circle':
			buttonContent = (
				<View
					testID={testID}
					style={[
						components.buttonCircle,
						gutters.marginBottom_16,
						customStyle,
					]}
				>
					{loading ? (
						<ActivityIndicator />
					) : (
						<TouchableOpacity onPress={onPress} disabled={isDisabled}>
							<Image
								source={imageSource}
								style={[components.image24, imageStyle]}
							/>
						</TouchableOpacity>
					)}
				</View>
			);
			break;
		case 'image':
			buttonContent = (
				<TouchableOpacity
					testID={testID}
					disabled={isDisabled}
					style={[gutters.marginBottom_16, layout.itemsCenter]}
					onPress={onPress}
				>
					<Image
						source={imageSource}
						style={[components.image48, imageStyle]}
					/>
					<Text style={[fonts.gray400, fonts.bold, fonts.size_10, textStyle]}>
						{text}
					</Text>
				</TouchableOpacity>
			);
			break;
		default:
			buttonContent = (
				<TouchableOpacity
					testID={testID}
					disabled={isDisabled}
					style={[
						components.button,
						gutters.marginBottom_16,
						positiveColor && backgrounds.success,
						isDisabled && backgrounds.gray400,
						customStyle,
					]}
					onPress={onPress}
				>
					{loading ? (
						<ActivityIndicator />
					) : (
						<View style={[layout.row, layout.itemsCenter]}>
							{imageSource && (
								<ImageVariant
									source={imageSource}
									style={[components.image24, gutters.marginRight_12]}
								/>
							)}
							<Text
								style={[
									fonts.size_16,
									fonts.gray800,
									fonts.bold,
									fonts.alignCenter,
									textStyle,
								]}
							>
								{text}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			);
	}

	return buttonContent;
}

export default CustomButton;
