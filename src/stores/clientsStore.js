import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useClientsStore = create((set) => ({
	clients: [],
	clientsTotal: 0,
	pagination: {
		totalPages: 0,
		currentPage: 1,
	},
	setClients: (clients) => set({ clients }),
	getClientInfo: async ({ fetchData, fetchError, clientId }) => {
		try {
			const client = await fetchData(
				`/api/clients/client_info/${clientId}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (client.error) {
				console.error('Error fetching client', client.error);
				return;
			}

			set({
				client: client,
			});

			return client;
		} catch (error) {
			toast.error('Error obteniendo el cliente');
			console.error('Error fetching client', fetchError);
		}
	},
	getClients: async ({ fetchData, fetchError, currentPage }) => {
		try {
			const clients = await fetchData(
				'/api/clients/?page=' + currentPage + '&limit=10',
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (clients.error) {
				console.error('Error fetching clients', clients.error);
				return;
			}

			set({
				clients: clients.users,
				clientsTotal: clients.total,
				pagination: {
					totalPages: clients.totalPages,
					currentPage: clients.currentPage,
				},
			});

			return clients;
		} catch (error) {
			toast.error('Error obteniendo los clientes');
			console.error('Error fetching clients', fetchError);
		}
	},
	getClientsSearch: async ({ fetchData, fetchError, clientName }) => {
		if (clientName.length < 3) {
			return;
		}

		try {
			const clients = await fetchData(
				'/api/clients/search/?clientName=' + clientName,
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (clients.error) {
				console.error('Error fetching clients', clients.error);
				return;
			}

			/* NO GUARDAR EL ESTADO */
			/* set({
				clients: clients.users,
				clientsTotal: clients.total,
				pagination: {
					totalPages: clients.totalPages,
					currentPage: clients.currentPage,
				},
			}); */

			return clients;
		} catch (error) {
			toast.error('Error obteniendo los clientes');
			console.error('Error fetching clients', fetchError);
		}
	},
	registerClient: async ({ fetchData, fetchError, newClientToCreate }) => {
		try {
			const clients = useClientsStore.getState().clients;
			const newClient = await fetchData('/api/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(newClientToCreate),
			});

			if (newClient.error) {
				console.error('Error fetching user data', newClient.error);
				return;
			}

			set({
				clients: [...clients, newClient],
			});

			toast.success('Cliente registrado');

			return newClient;
		} catch (error) {
			toast.error('Error registrando cliente');
			console.error('Error fetching user data', fetchError);
		}
	},
	updateClient: async ({ fetchData, fetchError, clientToUpdate }) => {
		try {
			const clients = useClientsStore.getState().clients;
			const updatedClient = await fetchData('/api/clients/update', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(clientToUpdate),
			});

			if (updatedClient.error) {
				console.error('Error updating client', updatedClient.error);
				return;
			}

			const newClients = clients.map((client) => {
				if (client.id === clientToUpdate.id) {
					const clientToReturn = {
						...client,
						...clientToUpdate,
					};
					return clientToReturn;
				}
				return client;
			});

			set({
				clients: newClients,
			});

			toast.success('Cliente actualizado');

			return clientToUpdate;
		} catch (error) {
			toast.error('Error actualizando el cliente');
			console.error('Error updating client', fetchError);
		}
	},
	deleteClient: async ({ fetchData, fetchError, clientId }) => {
		try {
			const clients = useClientsStore.getState().clients;
			const deletedClient = await fetchData(
				`/api/clients/delete/${clientId}`,
				{
					method: 'DELETE',
					credentials: 'include',
				},
			);

			if (deletedClient.error) {
				console.error('Error deleting client', deletedClient.error);
				return;
			}

			const newClients = clients.filter(
				(client) => client.id !== clientId,
			);

			set({
				clients: newClients,
			});

			toast.success('Cliente eliminado');

			return clientId;
		} catch (error) {
			toast.error('Error eliminando el cliente');
			console.error('Error deleting client', fetchError);
		}
	},
}));
