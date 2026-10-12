import 'react-native-gesture-handler/jestSetup';

// RNGH 3 installs worklet bindings on the UI runtime, which doesn't exist under Jest
jest.mock('react-native-worklets', () => ({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	...jest.requireActual('react-native-worklets'),
	getUIRuntimeHolder: () => ({}),
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('react-native-reanimated').setUpTests();

jest.mock('@react-native-clipboard/clipboard', () =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	require('@react-native-clipboard/clipboard/jest/clipboard-mock'),
);

// MMKV v4 uses an in-memory mock under Jest, but still imports Nitro at load time
jest.mock('react-native-nitro-modules', () => ({
	NitroModules: { createHybridObject: jest.fn() },
}));
