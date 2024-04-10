import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Welcome, Startup, Claim, SignUp } from '@/screens';
import { navigationRef } from './NavigationUtils';

import { RouteName, type ApplicationStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<NavigationContainer theme={navigationTheme} ref={navigationRef}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={RouteName.Startup} component={Startup} />
				<Stack.Screen name={RouteName.SignUp} component={SignUp} />
				<Stack.Screen name={RouteName.Welcome} component={Welcome} />
				<Stack.Screen name={RouteName.Claim} component={Claim} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
