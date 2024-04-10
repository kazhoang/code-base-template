// import 'whatwg-fetch';
import 'react-native-gesture-handler/jestSetup';
import '@shopify/react-native-skia/jestSetup';
import '@testing-library/jest-native/extend-expect';
import '@react-native-google-signin/google-signin/jest/build/setup';

jest.mock('react-native-reanimated', () =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	require('react-native-reanimated/mock'),
);

jest.mock('@react-native-clipboard/clipboard', () =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	require('@react-native-clipboard/clipboard/jest/clipboard-mock'),
);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
