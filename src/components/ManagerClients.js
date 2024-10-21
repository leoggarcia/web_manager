import {
	AtSign,
	Captions,
	ChevronDown,
	Globe,
	Key,
	Mail,
	MapPinHouse,
	MoveRight,
	Phone,
	Plus,
	Receipt,
	User,
	Users,
	X,
} from 'lucide-react';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientsStore } from '../stores/clientsStore';
import useFetch from '../hooks/useFetch';
import { useAuthStore } from '../stores/authStore';
import { useWebsitesStore } from '../stores/websitesStore';
import PopoverOptions from './PopoverOptions';
import { text } from 'framer-motion/client';
import ClientsTable from './ClientsTable';
import AddClientModal from './AddClientModal';
import UpdateClientModal from './UpdateClientModal';
import UpdateClientWebsitesModal from './UpdateClientWebsitesModal';

function ManagerClients() {
	const [openAddClient, setOpenAddClient] = useState(false);
	const [openUpdateClient, setOpenUpdateClient] = useState(false);
	const [openUpdateWebsites, setOpenUpdateWebsites] = useState(false);
	const [clientIdToUpdate, setClientIdToUpdate] = useState(null);

	const { clientsTotal } = useClientsStore();

	return (
		<div className="p-10">
			<div className="flex items-center gap-3">
				<h1 className="font-semibold text-2xl">Clientes</h1>
				<button
					onClick={() => {
						setOpenAddClient(true);
					}}
					className="w-5 h-5 flex justify-center items-center bg-indigo-600 text-sm text-white rounded-full"
				>
					<Plus size={15} color="#ffffff" />
				</button>
			</div>

			{/* DASHBOARD DATA */}
			<div className="flex items-center gap-5">
				{/* TODOS LOS CLIENTES */}
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-1/3">
					<div className="flex items-center mb-3 justify-between">
						<h3 className="font-medium text-base">
							Todos los clientes
						</h3>
						<Users size={20} className="opacity-50" />
					</div>
					<h4 className="font-semibold text-3xl">{clientsTotal ?? 0} clients</h4>
					<p className="text-xs opacity-50">
						+30% que la semana pasada
					</p>
				</div>

				{/* PROMEDIO DE COBROS */}
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-1/3">
					<div className="flex items-center mb-3 justify-between">
						<h3 className="font-medium text-base">
							Promedio de cobros
						</h3>
						<Receipt size={20} className="opacity-50" />
					</div>
					<h4 className="font-semibold text-3xl">$649.00</h4>
					<p className="text-xs opacity-50">
						+10% que la semana pasada
					</p>
				</div>
			</div>

			{/* WEBSITES TABLE */}
			<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5">
				<h2 className="font-semibold text-2xl">Todos los clientes</h2>

				<ClientsTable
					openUpdateClient={() => {
						setOpenUpdateClient(true);
					}}
					openUpdateClientWebsites={() => {
						setOpenUpdateWebsites(true);
					}}
					setClientIdToUpdate={setClientIdToUpdate}
				/>
			</div>

			{/* ADD CLIENT MODAL */}
			<Modal
				width={'auto'}
				open={openAddClient}
				setOpen={setOpenAddClient}
			>
				<AddClientModal
					closeModal={() => {
						setOpenAddClient(false);
					}}
				/>
			</Modal>
			<Modal
				width={'auto'}
				open={openUpdateClient}
				setOpen={setOpenUpdateClient}
			>
				<UpdateClientModal
					closeModal={() => {
						setOpenUpdateClient(false);
					}}
					clientIdToUpdate={clientIdToUpdate}
				/>
			</Modal>
			<Modal
				width={'auto'}
				open={openUpdateWebsites}
				setOpen={setOpenUpdateWebsites}
			>
				<UpdateClientWebsitesModal
					closeModal={() => {
						setOpenUpdateWebsites(false);
					}}
					clientIdToUpdate={clientIdToUpdate}
				/>
			</Modal>
		</div>
	);
}

export default ManagerClients;
