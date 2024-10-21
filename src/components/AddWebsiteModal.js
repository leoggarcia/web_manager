import { useState } from 'react';
import AddWebsiteForm from './AddWebsiteForm';
import { useWebsitesStore } from '../stores/websitesStore';
import useFetch from '../hooks/useFetch';
import { UserRoundSearch } from 'lucide-react';
import { useClientsStore } from '../stores/clientsStore';

function AddWebsiteModal({ closeModal }) {
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
	const [searchedClients, setSearchedClients] = useState([]);

	const { getClientsSearch } = useClientsStore();
	const { addWebsite } = useWebsitesStore();
	const { fetchData, fetchError } = useFetch();

	function updateWebsite(index, key, value) {
		const newWebsites = [...websites];
		newWebsites[index][key] = value;
		setWebsites(newWebsites);
	}

	function editWebsite(e) {
		e.preventDefault();

		if (!cliente.id) {
			return;
		}

		const newWebsite = {
			...websites[0],
			user_id: cliente.id,
		};
		console.log('🚀 ~ editWebsite ~ newWebsite:', newWebsite);

		addWebsite({
			newWebsite: newWebsite,
			fetchData,
			fetchError,
			clientId: cliente.id,
		});

		closeModal();
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

	return (
		<div>
			<h3 className="font-semibold text-xl mb-5">Agregar website</h3>

			{/* SELECT CLIENT */}
			<label
				htmlFor="cliente"
				className="block text-sm font-medium text-gray-700"
			>
				Cliente
			</label>
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

			<div
				style={{
					opacity: cliente.id ? 1 : 0.5,
				}}
			>
				<AddWebsiteForm
					handleSubmitNewWebsite={editWebsite}
					updateWebsite={updateWebsite}
					websites={websites}
					submitButtonTitle={'Agregar website'}
				/>
			</div>
		</div>
	);
}

export default AddWebsiteModal;
