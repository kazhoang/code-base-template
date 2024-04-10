import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import Clipboard from '@react-native-clipboard/clipboard';

import FacebookImage from '@/theme/assets/images/facebook.png';
import TwitterImage from '@/theme/assets/images/twitter.png';
import TelegramImage from '@/theme/assets/images/telegram.png';
import CustomTextInput from '@/components/atoms/CustomTextInput';
import {
	AvoidSoftInput,
	AvoidSoftInputView,
} from 'react-native-avoid-softinput';
import { useFocusEffect } from '@react-navigation/native';
import { moderateScale } from '@/types/theme/responsive';
import { navigate } from '@/navigators/NavigationUtils';
import { RouteName } from '@/types/navigation';

function Welcome() {
	const earlyAccessCode = '12345678';

	const { t } = useTranslation(['example', 'welcome']);

	const { layout, gutters, fonts } = useTheme();

	const onFocusEffect = React.useCallback(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);
		return () => {
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useFocusEffect(onFocusEffect);

	return (
		<SafeScreen>
			<AvoidSoftInputView
				style={layout.flex_1}
				showAnimationDuration={300}
				avoidOffset={moderateScale(80)}
			>
				<ScrollView contentContainerStyle={[layout.flex_1]}>
					<View
						style={[layout.flex_1, layout.itemsCenter, gutters.marginTop_40]}
					>
						<Brand height={160} width={160} />
						<View style={[gutters.paddingHorizontal_32, gutters.marginTop_16]}>
							<Text
								style={[
									fonts.size_40,
									fonts.gray800,
									fonts.bold,
									fonts.alignCenter,
								]}
							>
								{t('welcome:title')}
							</Text>
							<Text
								style={[
									fonts.gray400,
									fonts.bold,
									fonts.size_24,
									gutters.marginBottom_16,
									fonts.alignCenter,
								]}
							>
								{t('welcome:subtitle')}
							</Text>
							<Text
								style={[
									fonts.size_14,
									fonts.gray200,
									fonts.justify,
									fonts.lineHeight18,
									gutters.marginBottom_16,
								]}
							>
								{t('welcome:beforeStart')}
							</Text>
							<View
								style={[
									layout.row,
									layout.justifyAround,
									gutters.marginBottom_16,
								]}
							>
								<CustomButton
									type="image"
									onPress={() => {}}
									imageSource={TelegramImage}
									text="Telegram"
								/>
								<CustomButton
									type="image"
									onPress={() => {}}
									imageSource={TwitterImage}
									text="Twitter"
								/>
								<CustomButton
									type="image"
									onPress={() => {}}
									imageSource={FacebookImage}
									text="Facebook"
								/>
							</View>
							<TouchableOpacity
								onPress={() => {
									Clipboard.setString(earlyAccessCode);
								}}
							>
								<Text
									style={[
										fonts.size_14,
										fonts.gray200,
										fonts.justify,
										fonts.lineHeight18,
										gutters.marginBottom_80,
									]}
								>
									{t('welcome:invitationCode')}
									<Text
										style={[fonts.red500, fonts.bold, fonts.size_14]}
									>{`"${earlyAccessCode}"`}</Text>
									{t('welcome:clickHereToCopy')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				<View style={gutters.marginHorizontal_32}>
					<CustomTextInput
						placeholder={t('welcome:invitationCode')}
						centerText
					/>
					<CustomButton
						onPress={() => {
							navigate(RouteName.Claim);
						}}
						positiveColor
						text={t('welcome:activeAccount')}
					/>
				</View>
			</AvoidSoftInputView>
		</SafeScreen>
	);
}

export default Welcome;
