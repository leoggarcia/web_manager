import { useState, useCallback } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async (url, options = {}) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(process.env.REACT_APP_API_URL + url, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options.headers,
				},
			});

			// If there a 401 error, redirect to login
			if (
				response.status === 401 &&
				window.location.pathname !== '/login'
			) {
				window.location.href = '/login';
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(data?.error?.message || 'Hay un error');
			}

			setIsLoading(false);
			return data;
		} catch (e) {
			setError(e.message || 'Hay un error');
			setIsLoading(false);
			throw e;
		}
	}, []);

	return { fetchData, isLoading, error };
};

export default useFetch;
