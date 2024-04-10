import { navigate } from '@/navigators/NavigationUtils';
import { RouteName } from '@/types/navigation';
import {
	User,
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { Action, Thunk, action, thunk } from 'easy-peasy';

GoogleSignin.configure();

export interface UserState {
	user: User | undefined;
	error: ErrorGoogleSignIn | undefined;
	isSigning: boolean;
	isVerified: boolean;
}

export interface UserActions {
	setUser: Action<this, User>;
	setIsSigning: Action<this, boolean>;
	setError: Action<this, ErrorGoogleSignIn>;
}

export interface UserThunks {
	signInWithGoogle: Thunk<this>;
	getCurrentUserInfo: Thunk<this, void, any, any, Promise<boolean>>;
}

export interface UserModel extends UserState, UserActions, UserThunks {}

type ErrorGoogleSignIn = {
	code: keyof typeof statusCodes;
};

export const userModel: UserModel = {
	user: undefined,
	error: undefined,
	isSigning: false,
	isVerified: false,
	setUser: action((state, payload) => {
		state.user = payload;
	}),
	setIsSigning: action((state, payload) => {
		state.isSigning = payload;
	}),
	setError: action((state, payload) => {
		state.error = payload;
	}),
	signInWithGoogle: thunk(async actions => {
		try {
			actions.setIsSigning(true);
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();

			console.log('userInfo', userInfo);

			// Store Actions
			actions.setUser(userInfo);
			actions.setIsSigning(false);

			// Navigate
			navigate(RouteName.Welcome);
		} catch (error) {
			const errorGoogleSignIn = error as ErrorGoogleSignIn;
			actions.setError(errorGoogleSignIn);
			actions.setIsSigning(false);
		}
	}),
	getCurrentUserInfo: thunk(async actions => {
		try {
			actions.setIsSigning(true);
			const userInfo = await GoogleSignin.signInSilently();
			console.log('userInfo', userInfo);

			// Store Actions
			actions.setUser(userInfo);
			actions.setIsSigning(false);

			// Navigate
			navigate(RouteName.Claim);
			return true;
		} catch (error) {
			actions.setIsSigning(false);
			return false;
		}
	}),
};
