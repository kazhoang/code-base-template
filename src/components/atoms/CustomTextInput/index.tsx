import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

type CustomTextInputProps = TextInputProps & {
	customStyle?: ViewStyle | ViewStyle[];
	centerText?: boolean;
	error?: string;
};
function CustomTextInput(props: CustomTextInputProps) {
	const { gutters, components, fonts, colors } = useTheme();
	const { customStyle, centerText, error, ...rest } = props;

	return (
		<View style={customStyle}>
			<TextInput
				autoCapitalize="none"
				// autoFocus
				style={[
					components.textInput,
					gutters.marginBottom_16,
					centerText && fonts.alignCenter,
				]}
				placeholderTextColor={colors.gray200}
				{...rest}
			/>
			{error && (
				<Text style={[fonts.red500, fonts.bold, fonts.size_14]}>{error}</Text>
			)}
		</View>
	);
}

CustomTextInput.defaultProps = {
	customStyle: {},
	centerText: false,
	error: '',
};

export default CustomTextInput;
