import { useEffect, useState } from 'react';
import AddWebsiteForm from './AddWebsiteForm';
import useFetch from '../hooks/useFetch';
import { useWebsitesStore } from '../stores/websitesStore';
import { UserRoundSearch } from 'lucide-react';
import { useClientsStore } from '../stores/clientsStore';

function UpdateWebsiteModal({ closeModal, websiteToUpdate }) {
	const [searchedClients, setSearchedClients] = useState([]);
	const [cliente, setCliente] = useState({
		id: null,
		email: '',
		user_type: 'client',
		phone: '',
		name: '',
	});
	const [websites, setWebsites] = useState([
		{
			name: '',
			url: '',
			status: 'desarrollo',
			cost: 0,
			description: '',
			user_id: 1,
		},
	]);

	const { fetchData, isLoading, formError: fetchError } = useFetch();
	const { getWebsite, editWebesite } = useWebsitesStore();
	const { getClientsSearch } = useClientsStore();

	useEffect(() => {
		getTheWebsite();
	}, []);

	async function getTheWebsite() {
		const myWebsite = await getWebsite({
			fetchData,
			fetchError,
			websiteId: websiteToUpdate,
		});

		const websiteToSet = {
			id: myWebsite.id,
			name: myWebsite.name,
			url: myWebsite.url,
			status: myWebsite.status,
			cost: myWebsite.amount,
			description: myWebsite.description,
			user_id: myWebsite.client_id,
		};

		const clientToSet = {
			...cliente,
			id: myWebsite.client_id,
			email: myWebsite.client_email,
			user_type: 'client',
			name: myWebsite.client_name,
		};

		setWebsites([websiteToSet]);
		setCliente(clientToSet);
	}

	function updateWebsite(index, key, value) {
		const newWebsites = [...websites];
		newWebsites[index][key] = value;
		setWebsites(newWebsites);
	}

	async function searchClients(e) {
		const clientName = e.target.value;

		if (clientName.length > 2) {
			const clients = await getClientsSearch({
				fetchData,
				fetchError,
				clientName,
			});

			setSearchedClients(clients);
		} else {
			setSearchedClients([]);
		}
	}

	function editWebsite(e) {
		e.preventDefault();

		const newWebsite = {
			...websites[0],
			user_id: cliente.id,
		};

		editWebesite({
			updatedWebsite: newWebsite,
			fetchData,
			fetchError,
			clientId: cliente.id,
		});

		closeModal();
	}

	return (
		<div>
			<h3 className="font-semibold text-xl mb-5">
				Editar website {websites[0].name}
			</h3>

			{!cliente.id && (
				<>
					<div className="mt-1 mb-2 relative">
						<UserRoundSearch
							className="absolute top-1/2 opacity-50"
							size={20}
							style={{
								transform: 'translateY(-50%)',
								left: '0.75rem',
							}}
						/>
						<input
							id="cliente"
							name="cliente"
							type="text"
							required
							className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Buscar cliente"
							onChange={searchClients}
						/>
					</div>

					<div
						style={{
							justifyContent:
								searchedClients?.length > 0
									? 'flex-start'
									: 'center',
						}}
						className="mb-3 flex flex-col overflow-y-auto items-center justify-center h-28 bg-white text-sm appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						{searchedClients?.length === 0 ? (
							<p className="text-xs opacity-50">Buscar cliente</p>
						) : (
							searchedClients?.map((searchedClient) => {
								return (
									<div
										key={searchedClient.id}
										className="flex items-center gap-3 w-full justify-between p-1"
									>
										<p>
											{searchedClient.id}.{' '}
											{searchedClient.name}
										</p>
										<button
											className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md"
											onClick={() => {
												setCliente(searchedClient);
											}}
										>
											Seleccionar
										</button>
									</div>
								);
							})
						)}
					</div>
				</>
			)}

			{cliente.id && (
				<div className="mt-1 mb-3 flex items-center justify-between bg-white text-sm appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
					<p>
						{cliente.id}. {cliente.name}
					</p>
					<button
						className="bg-red-600 text-white text-xs px-2 py-1 rounded-md"
						onClick={() => {
							setCliente({
								id: null,
								email: '',
								user_type: 'client',
								phone: '',
								name: '',
							});
						}}
					>
						Quitar
					</button>
				</div>
			)}

			<AddWebsiteForm
				handleSubmitNewWebsite={editWebsite}
				updateWebsite={updateWebsite}
				websites={websites}
				submitButtonTitle={'Actualizar website'}
			/>
		</div>
	);
}

export default UpdateWebsiteModal;
