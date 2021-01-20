import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
const cache = setupCache({
	maxAge: 15 * 60 * 1000,
});

// create axios instance passing the cache adapter
const axiosInstance = axios.create({
	baseURL: 'https://6006b8333698a80017de1e0b.mockapi.io',
	adapter: cache.adapter,
	headers: {
		'Content-Type': 'application/json',
	},
});

export { axiosInstance as api };
