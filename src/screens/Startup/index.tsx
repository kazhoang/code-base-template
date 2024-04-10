import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import { RouteName, type ApplicationScreenProps } from '@/types/navigation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useStoreActions, useStoreState } from '@/stores/hooks';

function Startup({ navigation }: ApplicationScreenProps) {
	const { layout, gutters, fonts } = useTheme();

	const { isSigning, isVerified, error } = useStoreState(
		store => store.userModel,
	);
	const { getCurrentUserInfo } = useStoreActions(store => store.userModel);

	const checkPermission = async () => {
		// Example for Tracking StartUp Permission.
		// Remove in app.json also if not used
		const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
		if (result === RESULTS.DENIED) {
			await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
		}
	};

	const { isSuccess } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return checkPermission;
		},
	});

	useEffect(() => {
		getCurrentUserInfo()
			.then(isSigned => {
				if (!isSigned) {
					navigation.reset({
						index: 0,
						routes: [{ name: RouteName.SignUp }],
					});
				} else if (!isVerified) {
					navigation.reset({
						index: 0,
						routes: [{ name: RouteName.Welcome }],
					});
				} else {
					navigation.reset({
						index: 0,
						routes: [{ name: RouteName.Claim }],
					});
				}
			})
			.catch(err => {
				console.log('🚀 ~ useEffect ~ err:', err);
			});
	}, [isSuccess]);

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Brand />
				{isSigning && (
					<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
				)}
				{error && (
					<Text style={[fonts.size_16, fonts.red500]}>{error.code}</Text>
				)}
			</View>
		</SafeScreen>
	);
}

export default Startup;
