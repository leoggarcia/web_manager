import { useEffect, useState } from "react";
import { useClientsStore } from "../stores/clientsStore";
import useFetch from "../hooks/useFetch";
import AddClientForm from "./AddClientForm";

function UpdateClientModal({ closeModal, clientIdToUpdate }) {
	const [formError, setFormError] = useState(null);
	const [cliente, setCliente] = useState(null);

	const { getClientInfo, updateClient: updateClientInServer } =
		useClientsStore();
	const { fetchData, isLoading, formError: fetchError } = useFetch();

	useEffect(() => {
		getTheClient();
	}, []);

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

	const handleSubmitNewClient = async (e) => {
		e.preventDefault();

		const clientToUpdate = {
			id: clientIdToUpdate,
			name: cliente?.client_name,
			phone: cliente?.client_phone,
			address: cliente?.client_address,
		};

		updateClientInServer({
			clientToUpdate: clientToUpdate,
			fetchData,
			fetchError,
		});
		closeModal();
	};

	function updateClient(key, value) {
		const newClient = { ...cliente };
		newClient[key] = value;
		setCliente(newClient);
	}

	return (
		<div>
			<h3 className="font-semibold text-xl mb-5">
				Actualizar cliente {cliente?.client_name}
			</h3>

			{cliente && (
				<AddClientForm
					handleSubmitNewClient={handleSubmitNewClient}
					updateClientFunction={updateClient}
					cliente={cliente}
					addClient={false}
					formError={formError}
				/>
			)}
		</div>
	);
}

export default UpdateClientModal;
