// src/stores/authStore.js
import create from 'zustand';

export const useAuthStore = create((set) => ({
	user_type: null,
	user: null,
	login: (userData) =>
		set({
			isAuthenticated: true,
			user: userData,
			user_type: userData.user_type,
		}),
	logout: async () => {
		localStorage.removeItem('token');
		/* try {
			const userData = await fetchData('/api/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (userData.error) {
				console.error('Error login out', userData.error);
				return;
			}

			set({ user: null, user_type: null });

			return userData;
		} catch (error) {
			console.error('Error login out', fetchError);
		} */
	},
	register: async ({ fetchData, fetchError, newUserData }) => {
		try {
			const userData = await fetchData('/api/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(newUserData),
			});

			if (userData.error) {
				console.error('Error fetching user data', userData.error);
				return;
			}

			set({
				user: userData,
				user_type: userData.user_type,
			});

			return userData;
		} catch (error) {
			console.error('Error fetching user data', fetchError);
		}
	},
	checkAuth: async ({ fetchData, fetchError }) => {
		/* GET USER FROM THIS STORE */
		const user = useAuthStore.getState().user;

		try {
			const userData = await fetchData('/api/users/me', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`, // Encabezado de autorización correcto
				},
			});

			if (userData.error) {
				console.error('Error fetching user data', userData.error);
				return;
			}

			set({
				user: userData,
				user_type: userData.user_type,
			});

			return userData;
		} catch (error) {
			console.error('Error fetching user data', fetchError);
		}
	},
}));
