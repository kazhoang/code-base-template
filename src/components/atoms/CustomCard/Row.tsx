import { Text, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { moderateScale } from '@/types/theme/responsive';

type RowProps = {
	field: string;
	value: string;
	customStyle?: ViewStyle;
};

function Row({ field, value, customStyle }: RowProps) {
	const { fonts, gutters, layout } = useTheme();

	return (
		<View style={[layout.row, customStyle]}>
			<View
				style={[
					layout.flex_1,
					layout.row,
					layout.justifyBetween,
					layout.itemsCenter,
					gutters.paddingHorizontal_16,
					{
						height: moderateScale(32),
					},
				]}
			>
				<Text style={[fonts.size_14, fonts.gray200]}>{field}</Text>
				<Text style={[fonts.size_14, fonts.infoClaimText, fonts.bold]}>
					{value}
				</Text>
			</View>
		</View>
	);
}

Row.defaultProps = {
	customStyle: {},
};
export default Row;
