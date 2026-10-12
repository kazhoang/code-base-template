module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
				alias: {
					'@': './src',
				},
			},
		],
		'inline-dotenv',
		'react-native-worklets/plugin', // needs to be last
	],
};
