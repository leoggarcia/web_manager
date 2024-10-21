import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useWebsitesStore } from '../stores/websitesStore';
import { useClientsStore } from '../stores/clientsStore';
import AddWebsiteForm from './AddWebsiteForm';

function UpdateClientWebsitesModal({ closeModal, clientIdToUpdate }) {
	const [emptyWebsite, setEmptyWebsite] = useState(true);
	const [cliente, setCliente] = useState({
		id: null,
		email: '',
		password: '',
		confirm_password: '',
		user_type: 'client',
		client_phone: '',
		client_address: '',
		client_name: '',
	});
	const [websites, setWebsites] = useState([
		{
			name: '',
			url: '',
			status: '',
			cost: 0,
			description: '',
			user_id: 1,
		},
	]);

	const { fetchData, isLoading, formError: fetchError } = useFetch();
	const { editWebesite, addWebsite, getWebesitesByClientId } =
		useWebsitesStore();
	const { getClientInfo } = useClientsStore();

	useEffect(() => {
		getWebsites();
		getTheClient();

		return () => {
			setWebsites([
				{
					name: '',
					url: '',
					status: '',
					cost: 0,
					description: '',
					user_id: 1,
				},
			]);
			setCliente({
				id: null,
				email: '',
				password: '',
				confirm_password: '',
				user_type: 'client',
				client_phone: '',
				client_address: '',
				client_name: '',
			});
		};
	}, []);

	async function getWebsites() {
		if (clientIdToUpdate) {
			const clientWebesites = await getWebesitesByClientId({
				clientId: clientIdToUpdate,
				fetchData,
				fetchError,
			});

			if (clientWebesites?.length > 0) {
				setEmptyWebsite(false);
				setWebsites(clientWebesites);
			}
		}
	}

	async function getTheClient() {
		if (clientIdToUpdate) {
			const clientToEdit = await getClientInfo({
				clientId: clientIdToUpdate,
				fetchData,
				fetchError,
			});

			const clientToSet = {
				client_name: clientToEdit?.name,
				email: clientToEdit?.email,
				client_phone: clientToEdit?.phone,
				client_address: clientToEdit?.address,
			};

			setCliente(clientToSet);
		} else {
			closeModal();
		}
	}

	function updateWebsite(index, key, value) {
		const newWebsites = [...websites];
		newWebsites[index][key] = value;
		setWebsites(newWebsites);
	}

	function addEditWebsite(e) {
		e.preventDefault();

		const newWebsite = {
			...websites[0],
			user_id: clientIdToUpdate,
		};
		/* console.log("🚀 ~ addEditWebsite ~ newWebsite:", newWebsite) */

		if (emptyWebsite) {
			addWebsite({
				newWebsite: newWebsite,
				fetchData,
				fetchError,
				clientId: clientIdToUpdate,
			});
		} else {
			editWebesite({
				updatedWebsite: newWebsite,
				fetchData,
				fetchError,
				clientId: clientIdToUpdate,
			});
		}

		closeModal();
	}

	return (
		<div>
			<h3 className="font-semibold text-xl mb-5">
				Editar websites a {cliente?.client_name ?? 'este cliente'}
			</h3>

			<AddWebsiteForm
				handleSubmitNewWebsite={addEditWebsite}
				updateWebsite={updateWebsite}
				websites={websites}
				submitButtonTitle={
					emptyWebsite ? 'Crear website' : 'Actualizar website'
				}
			/>
		</div>
	);
}

export default UpdateClientWebsitesModal;
