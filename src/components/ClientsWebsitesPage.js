import {
	Eye,
	Globe,
	Mail,
	MonitorSmartphone,
	MoveRight,
	Phone,
	Users,
} from 'lucide-react';
import { useWebsitesStore } from '../stores/websitesStore';
import { useEffect } from 'react';
import ClientWebsite from './ClientWebsite';
import useFetch from '../hooks/useFetch';
import { useAuthStore } from '../stores/authStore';
import { Toaster } from 'react-hot-toast';

function ClientsWebsitesPage() {
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthStore();
	const { myWebsites, loadingMyWebistes, getWebesitesByClientId } =
		useWebsitesStore();

	useEffect(() => {
		if (user?.id) {
			getWebesitesByClientId({
				fetchData,
				fetchError: error,
				clientId: user.id,
			});
		}
	}, [user]);

	return (
		<div className="p-10">
			<Toaster />
			<div className="flex items-center gap-3">
				<h1 className="font-semibold text-2xl">Mis websites</h1>
			</div>
			<div className="flex flex-col items-center gap-5">
				{loadingMyWebistes ? (
					<div className="animate-pulse h-[400px] rounded-lg bg-gray-100"></div>
				) : !myWebsites || myWebsites?.length === 0 ? (
					<p>No hay websites</p>
				) : (
					myWebsites?.map((website) => {
						return (
							<ClientWebsite key={website.id} website={website} />
						);
					})
				)}
			</div>
			<div className="bg-indigo-300 bg-green-300 bg-green-400 bg-gray-300 bg-gray-400 bg-gradient-to-r from-gray-400 to-gray-400 bg-gradient-to-r from-indigo-400 to-indigo-400 bg-gradient-to-r from-green-400 to-green-400"></div>
		</div>
	);
}

export default ClientsWebsitesPage;
