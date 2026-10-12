import { createNavigationContainerRef } from '@react-navigation/native';
import { ApplicationStackParamList } from '@/types/navigation';

export const navigationRef =
	createNavigationContainerRef<ApplicationStackParamList>();

export const navigate = (
	name: keyof ApplicationStackParamList,
	params?: ApplicationStackParamList[keyof ApplicationStackParamList],
): void => {
	if (navigationRef.isReady()) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(navigationRef.navigate as (...args: any[]) => void)(name, params);
	}
};
