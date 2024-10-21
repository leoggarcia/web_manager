import { Globe, GlobeLock, Plus, Receipt } from 'lucide-react';
import WebsitesTable from './WebsitesTable';
import { useWebsitesStore } from '../stores/websitesStore';
import Modal from './Modal';
import { useState } from 'react';
import UpdateWebsiteModal from './UpdateWebsiteModal';
import AddWebsiteModal from './AddWebsiteModal';

function ManagerWebsites() {
	const [openEditWebsite, setOpenEditWebsite] = useState(false);
	const [openAddWebsite, setOpenAddWebsite] = useState(false);
	const [websiteToUpdate, setWebsiteToUpdate] = useState(null);

	const { websitesTotal } = useWebsitesStore();

	return (
		<div className="p-10">
			<div className="flex items-center gap-3">
				<h1 className="font-semibold text-2xl">Websites</h1>
				<button
					onClick={() => {
						setOpenAddWebsite(true);
					}}
					className="w-5 h-5 flex justify-center items-center bg-indigo-600 text-sm text-white rounded-full"
				>
					<Plus size={15} color="#ffffff" />
				</button>
			</div>

			{/* DASHBOARD DATA */}
			<div className="flex items-center gap-5">
				{/* TODOS LOS SITIOS */}
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-1/3">
					<div className="flex items-center mb-3 justify-between">
						<h3 className="font-medium text-base">
							Todos los website
						</h3>
						<Globe size={20} className="opacity-50" />
					</div>
					<h4 className="font-semibold text-3xl">
						{websitesTotal} sitios
					</h4>
					<p className="text-xs opacity-50">
						+30% que la semana pasada
					</p>
				</div>

				{/* SITIOS ACTIVOS */}
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-1/3">
					<div className="flex items-center mb-3 justify-between">
						<h3 className="font-medium text-base">
							Websites activos
						</h3>
						<GlobeLock size={20} className="opacity-50" />
					</div>
					<h4 className="font-semibold text-3xl">21 sitios</h4>
					<p className="text-xs opacity-50">
						+10% que la semana pasada
					</p>
				</div>

				{/* GANACIA ESTIMADA */}
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-1/3">
					<div className="flex items-center mb-3 justify-between">
						<h3 className="font-medium text-base">
							Ganancia esperada
						</h3>
						<Receipt size={20} className="opacity-50" />
					</div>
					<h4 className="font-semibold text-3xl">$12,600.00</h4>
					<p className="text-xs opacity-50">
						+10% que la semana pasada
					</p>
				</div>
			</div>

			{/* WEBSITES TABLE */}
			<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5">
				<h2 className="font-semibold text-2xl">Todos los websites</h2>

				<WebsitesTable
					openUpdateWebsite={() => {
						setOpenEditWebsite(true);
					}}
					setWebsiteToUpdate={setWebsiteToUpdate}
				/>
			</div>

			{/* ADD WEBSITE */}
			<Modal
				width={'auto'}
				open={openAddWebsite}
				setOpen={setOpenAddWebsite}
			>
				<AddWebsiteModal
					closeModal={() => {
						setOpenAddWebsite(false);
					}}
				/>
			</Modal>

			{/* UPDATE WEBSITE */}
			<Modal
				width={'auto'}
				open={openEditWebsite}
				setOpen={setOpenEditWebsite}
			>
				<UpdateWebsiteModal
					websiteToUpdate={websiteToUpdate}
					closeModal={() => {
						setOpenEditWebsite(false);
					}}
				/>
			</Modal>
		</div>
	);
}

export default ManagerWebsites;
