import { createNavigationContainerRef } from '@react-navigation/native';
import { ApplicationStackParamList } from '@/types/navigation';

export const navigationRef: any = createNavigationContainerRef();

export const navigate = (
	name: keyof ApplicationStackParamList,
	params?: ApplicationStackParamList[keyof ApplicationStackParamList],
): void => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};
