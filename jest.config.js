module.exports = {
	preset: '@react-native/jest-preset',
	// Reanimated 4 / Worklets swap in their JS implementations under Jest
	resolver: 'react-native-reanimated/jest/resolver',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	setupFiles: [
		'@shopify/react-native-skia/jestSetup.js',
		// google-signin doesn't export its jest mock, so load it by path
		'<rootDir>/node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js',
	],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-google-signin|@shopify/react-native-skia|react-native-.*|ky)/)',
	],
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/src/**/*.test.{ts,tsx}'],
	coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
	testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
};
