import { View, Text, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import {
	CustomCard,
	ProfileButton,
	Row,
	UnlockButton,
} from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { formatCurrency } from '@/utils/helpers';
import GradientText from '@/components/atoms/GradientText';
import CopyButton from '@/components/atoms/CopyButton';

function Claim() {
	const { t } = useTranslation(['claim', 'common']);

	const { variant, changeTheme, layout, gutters, fonts } = useTheme();

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	return (
		<SafeScreen>
			<ScrollView
				contentContainerStyle={[layout.flex_1]}
				bounces={false}
				keyboardShouldPersistTaps="always"
			>
				<View
					style={[
						layout.row,
						layout.justifyBetween,
						gutters.paddingHorizontal_16,
						layout.z100,
						layout.fullWidth,
					]}
				>
					<View>
						<TouchableOpacity
							style={layout.row}
							onPress={async () => {
								await Linking.openURL('https://google.com');
							}}
						>
							<Text style={[fonts.size_12, fonts.bold, fonts.gray800]}>
								{t('claim:landingPage')}
							</Text>
							<Text style={[fonts.size_12]}>{t('online')}</Text>
						</TouchableOpacity>
					</View>
					<ProfileButton
						onPress={() => {
							onChangeTheme();
						}}
					/>
				</View>
				<View style={[layout.flex_1, layout.justifyAround]}>
					<View
						style={[
							gutters.paddingHorizontal_16,
							layout.itemsCenter,
							gutters.marginBottom_16,
						]}
					>
						<Brand height={120} width={120} />
						<GradientText
							text={t('claim:displayValue', { value: formatCurrency(105298) })}
							style={gutters.marginVertical_12}
						/>
						<CustomCard>
							<View style={gutters.paddingVertical_16}>
								<Row
									customStyle={gutters.marginBottom_12}
									field={t('common:title')}
									value={t('common:value')}
								/>
								<Row
									customStyle={gutters.marginBottom_12}
									field={t('common:title')}
									value={t('common:value')}
								/>
								<Row
									customStyle={gutters.marginBottom_12}
									field={t('common:title')}
									value={t('common:value')}
								/>
								<Row
									customStyle={gutters.marginBottom_12}
									field={t('common:title')}
									value={t('common:value')}
								/>
								<Row
									field={t('claim:invited')}
									value={t('claim:users', { value: 12 })}
								/>
							</View>
						</CustomCard>
						<View style={[layout.row, gutters.marginTop_32]}>
							<Text
								style={[
									fonts.size_16,
									fonts.purple500,
									fonts.bold,
									fonts.alignCenter,
									gutters.marginRight_10,
								]}
							>
								{t('claim:yourInvitationCode', { value: 601855437 })}
							</Text>
							<CopyButton value="601855437" />
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={[gutters.marginHorizontal_32, gutters.marginBottom_16]}>
				<UnlockButton
					onPress={() => {
						// show();
						console.log('🚀 ~ Claim ~ UnlockButton Pressed');
					}}
					timeUnlock={new Date(new Date().getTime() + 0.05 * 60000)}
				/>
			</View>
		</SafeScreen>
	);
}

export default Claim;
