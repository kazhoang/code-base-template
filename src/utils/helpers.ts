export function wait(timeout: number): Promise<any> {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

export const formatCurrency = (amount: number) => {
	if (Number.isNaN(amount)) {
		return 'Invalid amount';
	}
	const formattedAmount = parseFloat(amount.toString()).toFixed(2);
	const [integerPart, fractionalPart] = formattedAmount.split('.');
	const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return `${integerWithCommas}.${fractionalPart}`;
};

export const getRandomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
