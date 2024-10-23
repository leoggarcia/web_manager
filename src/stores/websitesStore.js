import { create } from 'zustand';
import toast from 'react-hot-toast';
import { useAuthStore } from './authStore';

export const useWebsitesStore = create((set) => ({
	websites: [],
	myWebsites: [], // As a client
	loadingMyWebistes: false,
	websitesTotal: 0,
	pagination: {
		totalPages: 0,
		currentPage: 1,
	},
	getWebsites: async ({ fetchData, fetchError, currentPage }) => {
		try {
			const websites = await fetchData(
				'/api/websites?page=' + currentPage + '&limit=10',
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (websites.error) {
				console.error('Error fetching websites', websites.error);
				return;
			}

			set({
				websites: websites.websites,
				websitesTotal: websites.total,
				pagination: {
					totalPages: websites.totalPages,
					currentPage: websites.currentPage,
				},
			});

			return websites;
		} catch (error) {
			toast.error('Error obteniendo los websites');
			console.error('Error fetching websites', fetchError);
		}
	},
	getWebsite: async ({ fetchData, fetchError, websiteId }) => {
		if (!websiteId) {
			return;
		}

		try {
			const website = await fetchData(`/api/websites/${websiteId}`, {
				method: 'GET',
				credentials: 'include',
			});

			if (website.error) {
				console.error('Error fetching website', website.error);
				return;
			}

			return website;
		} catch (error) {
			toast.error('Error obteniendo el website');
			console.error('Error fetching website');
		}
	},
	getWebesitesByClientId: async ({ fetchData, fetchError }) => {
		try {
			set({ loadingMyWebistes: true });
			const websites = await fetchData(
				`/api/users/me?populate=websites`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`, // Encabezado de autorización correcto
					},
				},
			);

			if (websites.error) {
				console.error('Error fetching websites', websites.error);
				return;
			}

			const mapa = new Map();

			websites.websites.forEach((item) => {
				// Si el documentId no está en el mapa, lo añadimos
				mapa.set(item.documentId, item);
			});

			set({
				myWebsites: Array.from(mapa.values()),
			});
			set({ loadingMyWebistes: false });

			return Array.from(mapa.values());
		} catch (error) {
			set({ loadingMyWebistes: false });
			toast.error('Error obteniendo el website');
			console.error('Error fetching websites', fetchError);
		}
	},
	getWebsiteSubscription: async ({ fetchData, fetchError, websiteId }) => {
		try {
			const websiteSubscription = await fetchData(
				`/api/website-subscriptions?filters[website][id][$eq]=${websiteId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`, // Encabezado de autorización correcto
					},
				},
			);

			if (websiteSubscription.error) {
				console.error(
					'Error fetching website subscription',
					websiteSubscription.error,
				);
				return;
			}

			return websiteSubscription?.data[0];
		} catch (error) {
			toast.error('Error obteniendo la suscripción del website');
			console.error('Error fetching website subscription', fetchError);
		}
	},
	payWebsite: async ({
		fetchData,
		fetchError,
		website_subscription_id,
		website_price,
	}) => {
		try {
			const website = await fetchData(`/api/stripe_checkout`, {
				method: 'POST',
				/* credentials: 'include', */
				body: JSON.stringify({
					website_subscription_id: website_subscription_id,
				}),
			});

			if (website.error) {
				console.error('Error paying website', website.error);
				return;
			}

			/* toast.success('Website pagado'); */

			window.open(website.url, '_self');

			return website.url;
		} catch (error) {
			toast.error('Error pagando el website');
			console.error('Error paying website', fetchError);
		}
	},
	cancelWebsiteSubscription: async ({
		fetchData,
		fetchError,
		website_subscription_id,
		strapi_subscription_Id,
	}) => {
		try {
			const { user } = useAuthStore.getState();
			const { getWebesitesByClientId } = useWebsitesStore.getState();

			const website = await fetchData(`/api/cancel_subscription`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					strapiSubscriptionId: strapi_subscription_Id,
					subscriptionId: website_subscription_id,
				}),
			});

			if (website.error) {
				console.error('Error canceling website', website.error);
				return;
			}

			getWebesitesByClientId({
				fetchData,
				fetchError,
				clientId: user.id,
			});

			toast.success('Subscripción cancelada');

			return website;
		} catch (error) {
			toast.error('Error cancelando el website');
			console.error('Error canceling website', fetchError);
		}
	},
	/* addWebsite: async ({ fetchData, fetchError, newWebsite, clientId }) => {
		try {
			const websites = useWebsitesStore.getState().websites;
			const { clients, setClients } = useClientsStore.getState();

			const website = await fetchData('/api/websites/add', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					...newWebsite,
					status: newWebsite.status ?? 'desarrollo',
				}),
			});

			if (website.error) {
				console.error('Error adding website', website.error);
				return;
			}

			set({
				websites: [...websites, website],
			});

			const client = clients.find((client) => client.id === clientId);
			let clientWebesites = JSON.parse(client.websites);
			// Remove empty websites from clientWebesites
			clientWebesites = clientWebesites.filter((clientWebsite) => {
				return clientWebsite?.url !== null;
			});

			const websitesToPush = {
				name: newWebsite.name,
				url: newWebsite.url,
			};

			clientWebesites.push(websitesToPush);
			const updatedClient = {
				...client,
				websites: JSON.stringify(clientWebesites),
			};
			const updatedClients = clients.map((client) =>
				client.id === clientId ? updatedClient : client,
			);

			setClients(updatedClients);

			toast.success('Website agregado');

			return website;
		} catch (e) {
			toast.error('Error agregando el website');
			console.error('Error adding website', fetchError);
		}
	},
	editWebesite: async ({
		fetchData,
		fetchError,
		updatedWebsite,
		clientId,
	}) => {
		try {
			const websites = useWebsitesStore.getState().websites;
			const { clients, setClients } = useClientsStore.getState();

			const website = await fetchData(
				`/api/websites/update/${updatedWebsite.id}`,
				{
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify({
						...updatedWebsite,
						status: updatedWebsite.status ?? 'desarrollo',
					}),
				},
			);

			if (website.error) {
				console.error('Error editing website', website.error);
				return;
			}

			set({
				websites: websites.map((website) => {
					if (website.id === updatedWebsite.id) {
						return { ...website, ...updatedWebsite };
					}
					return website;
				}),
			});

			toast.success('Website actualizado');

			return website;
		} catch (e) {
			toast.error('Error editando el website');
			console.error('Error editing website', fetchError);
		}
	},
	deleteWebsite: async ({ fetchData, fetchError, websiteId }) => {
		try {
			const websites = useWebsitesStore.getState().websites;
			const { clients, setClients } = useClientsStore.getState();

			const website = await fetchData(
				`/api/websites/delete/${websiteId}`,
				{
					method: 'DELETE',
					credentials: 'include',
				},
			);

			if (website.error) {
				console.error('Error deleting website', website.error);
				return;
			}

			set({
				websites: websites.filter(
					(website) => website.id !== websiteId,
				),
			});

			toast.success('Website eliminado');

			return website;
		} catch (e) {
			toast.error('Error eliminado el website');
			console.error('Error deleting website', fetchError);
		}
	}, */
}));
