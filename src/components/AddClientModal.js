import { useState } from "react";
import { useClientsStore } from "../stores/clientsStore";
import { useWebsitesStore } from "../stores/websitesStore";
import useFetch from "../hooks/useFetch";
import { motion, AnimatePresence } from 'framer-motion';
import AddClientForm from "./AddClientForm";
import AddWebsiteForm from "./AddWebsiteForm";

function AddClientModal({ closeModal }) {
	const [formError, setFormError] = useState(null);
	const [nextStep, setNextStep] = useState(false);
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

	const { registerClient } = useClientsStore();
	const { addWebsite } = useWebsitesStore();
	const { fetchData, isLoading, formError: fetchError } = useFetch();

	function updateWebsite(index, key, value) {
		const newWebsites = [...websites];
		newWebsites[index][key] = value;
		setWebsites(newWebsites);
	}

	function updateClient(key, value) {
		const newClient = { ...cliente };
		newClient[key] = value;
		setCliente(newClient);
	}

	const handleSubmitNewClient = async (e) => {
		e.preventDefault();

		if (cliente.password !== cliente.confirm_password) {
			setFormError('Las contraseñas no coinciden');
		}

		setNextStep(true);

		/* const newClient = {
			email,
			password,
			user_type: 'client',
			client_phone: phone,
			client_address: address,
			client_name: nombre,
		};

		const response = await registerClient({
			newUserData: newClient,
			fetchData,
			fetchError,
		});

		setCliente(response);
		console.log('🚀 ~ handleSubmitNewClient ~ response:', response); */
	};

	const handleSubmitNewWebsite = async (e) => {
		e.preventDefault();

		const createdClient = await registerClient({
			newUserData: cliente,
			fetchData,
			fetchError,
		});

		const newWebsite = {
			...websites[0],
			user_id: createdClient.id,
		};
		addWebsite({
			newWebsite: newWebsite,
			fetchData,
			fetchError,
			clientId: createdClient.id,
		});
	};

	async function addClientWithoutWebsite() {
		await registerClient({
			newClientToCreate: cliente,
			fetchData,
			fetchError,
		});

		closeModal();
	}

	return (
		<div>
			<AnimatePresence mode="wait">
				{!nextStep && (
					<>
						{/* ADD CLIENT */}
						<motion.div
							key="elemento1"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							<h3 className="font-semibold text-xl mb-5">
								Agregar nuevo cliente
							</h3>
							<AddClientForm
								handleSubmitNewClient={handleSubmitNewClient}
								updateClientFunction={updateClient}
								cliente={cliente}
								addClient={true}
								formError={formError}
							/>
						</motion.div>
					</>
				)}
				{nextStep && (
					<>
						{/* ADD WEBSITE TO THE CLIENT */}
						<motion.div
							key="elemento2"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							<h3 className="font-semibold text-xl mb-5">
								Agregar website a {cliente.client_name}
							</h3>
							<AddWebsiteForm
								handleSubmitNewWebsite={handleSubmitNewWebsite}
								updateWebsite={updateWebsite}
								websites={websites}
								addClientWithoutWebsite={
									addClientWithoutWebsite
								}
							/>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default AddClientModal;
