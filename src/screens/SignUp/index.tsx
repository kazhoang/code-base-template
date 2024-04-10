import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { isImageSourcePropType } from '@/types/guards/image';

import GoogleSignInImage from '@/theme/assets/images/google_signin.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import { useStoreActions, useStoreState } from '@/stores/hooks';

function SignUp() {
	const { t } = useTranslation(['example', 'signup']);
	const { isSigning } = useStoreState(store => store.userModel);
	const { signInWithGoogle } = useStoreActions(store => store.userModel);

	const { colors, variant, changeTheme, layout, gutters, fonts } = useTheme();

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	if (
		!isImageSourcePropType(GoogleSignInImage) ||
		!isImageSourcePropType(ColorsWatchImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<ScrollView style={layout.flex_1}>
				<CustomButton
					testID="signup-change-theme"
					type="circle"
					onPress={() => onChangeTheme()}
					imageSource={ColorsWatchImage}
					customStyle={[layout.absolute, layout.right16]}
					imageStyle={{ tintColor: colors.purple500 }}
				/>
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_40,
					]}
				>
					<Brand height={240} width={240} />
				</View>

				<View style={[gutters.paddingHorizontal_32]}>
					<View style={[gutters.marginTop_40]}>
						<Text
							style={[
								fonts.size_40,
								fonts.gray800,
								fonts.bold,
								fonts.alignCenter,
							]}
						>
							{t('signup:title')}
						</Text>
						<Text
							style={[
								fonts.gray400,
								fonts.bold,
								fonts.size_24,
								gutters.marginBottom_32,
								fonts.alignCenter,
							]}
						>
							{t('signup:subtitle')}
						</Text>
						<Text
							style={[
								fonts.size_16,
								fonts.gray200,
								gutters.marginBottom_40,
								fonts.alignCenter,
							]}
						>
							{t('signup:description')}
						</Text>
					</View>
				</View>
			</ScrollView>
			<View style={gutters.marginHorizontal_32}>
				<CustomButton
					testID="google-signin"
					type="regular"
					onPress={() => {
						signInWithGoogle();
					}}
					loading={isSigning}
					imageSource={GoogleSignInImage}
					text={t('signup:signInWithGoogle')}
				/>
				{/* {error ? (
					<Text
						style={[
							fonts.size_16,
							fonts.red500,
							gutters.marginBottom_40,
							fonts.alignCenter,
						]}
					>
						{error.code}
					</Text>
				) : null} */}
			</View>
		</SafeScreen>
	);
}

export default SignUp;
