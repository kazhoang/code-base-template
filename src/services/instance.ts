import ky from 'ky';

const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;

export const instance = ky.extend({
	prefix: prefixUrl,
	headers: {
		Accept: 'application/json',
	},
});
