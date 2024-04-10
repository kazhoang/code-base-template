import { Dimensions, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const { height: deviceHeight } = Dimensions.get('screen');

const statusBarHeight = StatusBar.currentHeight ?? 0;

const screenHeightIncludeNavBar = deviceHeight - statusBarHeight;

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const toHeight = (percent: number) => {
	return screenHeight * (percent / 100);
};

const scale = (size: number) => (screenWidth / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
	(screenHeight / guidelineBaseHeight) * size;

const cachedSize: Record<string, number> = {};

const moderateScale = (size: number, factor = 0.5) => {
	if (cachedSize[`${size}_${factor}`]) {
		return cachedSize[`${size}_${factor}`];
	}
	const newSize = size + (scale(size) - size) * factor;
	cachedSize[`${size}_${factor}`] = newSize;
	return newSize;
};

export {
	scale,
	verticalScale,
	moderateScale,
	screenWidth,
	screenHeight,
	deviceHeight,
	screenHeightIncludeNavBar,
	toHeight,
};

export function ResponsiveFont(size: number, factor = 0.25): number {
	return moderateScale(size, factor);
}

export function ResponsiveWidth(size: number, factor = 0.5): number {
	return moderateScale(size, factor);
}

export function ResponsiveHeight(size: number, factor = 0.5): number {
	return moderateScale(size, factor);
}
