import { StackScreenProps } from '@react-navigation/stack';

// Define type for route parameters
export type RouteParams = undefined;

// Define stack screen props with application-specific param list
export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;

// Define application stack param list
export type ApplicationStackParamList = {
	Startup: RouteParams;
	Welcome: RouteParams;
	Claim: RouteParams;
	SignUp: RouteParams;
};

// Define enum for route names
export enum RouteName {
	Startup = 'Startup',
	SignUp = 'SignUp',
	Welcome = 'Welcome',
	Claim = 'Claim',
}
