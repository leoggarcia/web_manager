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
				) : (!myWebsites || myWebsites?.length === 0 ) ? (
					<p>No hay websites</p>
				) : (
					myWebsites?.map((website) => {
						return (
							<ClientWebsite key={website.id} website={website} />
						);
					})
				)}


				<p>-----------------</p>

				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-full">
					<div className="flex items-center mb-3 justify-between">
						<h4 className="font-semibold text-3xl">
							Leo García´s Portfolio
						</h4>
						<Globe size={20} className="opacity-50" />
					</div>
					<h3 className="font-normal text-base text-indigo-400 mb-5">
						leogarciag.com
					</h3>
					{/* WEBSITE STATUS */}
					<div className="flex gap-0 mb-5">
						{/* CICULO DISEÑO */}
						<div className="flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-indigo-400 rounded-full drop-shadow-md">
								<div className="w-6 h-6 absolute  bg-indigo-300 rounded-full animate-ping"></div>
								<div className="w-5 h-5 bg-indigo-300 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">En proceso</p>
						</div>
						{/* LINEA DISEÑO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg animate-pulse bg-gradient-to-r from-indigo-400 to-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO DESARROLLO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA DESARROLLO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO PUBLICADO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold text-red-500">
								Publicado
							</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA PUBLICADO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO TERMIANDO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">
								Sitio terminado
							</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<h4 className="font-semibold text-xl text-red-500">
							Subscipción
						</h4>
						<p className="text-sm">
							Activa la subscripción para publicar tu sitio
							automáticamentea.
						</p>
						<button className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
							Subscribirme
							<MoveRight color="#ffffff" size={22} />
						</button>
					</div>

					<p className="w-full mt-7 text-center text-xs text-gray-400">
						El tiempo de desarrollo del sitio web puede ser de hasta
						un mes.
					</p>
				</div>
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-full">
					<div className="flex items-center mb-3 justify-between">
						<h4 className="font-semibold text-3xl">
							Leo García´s Portfolio
						</h4>
						<Globe size={20} className="opacity-50" />
					</div>
					<h3 className="font-normal text-base text-indigo-400 mb-5">
						leogarciag.com
					</h3>
					{/* WEBSITE STATUS */}
					<div className="flex gap-0 mb-5">
						{/* CICULO DISEÑO */}
						<div className="flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-indigo-400 rounded-full drop-shadow-md">
								<div className="w-6 h-6 absolute  bg-indigo-300 rounded-full animate-ping"></div>
								<div className="w-5 h-5 bg-indigo-300 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">En proceso</p>
						</div>
						{/* LINEA DISEÑO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg animate-pulse bg-gradient-to-r from-indigo-400 to-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO DESARROLLO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA DESARROLLO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO PUBLICADO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold text-green-500">
								Publicado
							</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA PUBLICADO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-gray-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO TERMIANDO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-gray-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">
								Sitio terminado
							</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<h4 className="font-semibold text-xl text-green-500">
							Subscipción activa
						</h4>
						<p className="text-sm">
							La publicación de tu sitio web se publicará
							automáticamente.
						</p>
					</div>

					<p className="w-full mt-7 text-center text-xs text-gray-400">
						El tiempo de desarrollo del sitio web puede ser de hasta
						un mes.
					</p>
				</div>
				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-full">
					<div className="flex items-center mb-3 justify-between">
						<h4 className="font-semibold text-3xl">
							Leo García´s Portfolio
						</h4>
						<Globe size={20} className="opacity-50" />
					</div>
					<h3 className="font-normal text-base text-indigo-400 mb-5">
						leogarciag.com
					</h3>
					{/* WEBSITE STATUS */}
					<div className="flex gap-0 mb-5">
						{/* CICULO DISEÑO */}
						<div className="flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-green-300 rounded-full drop-shadow-md">
								<div className="w-5 h-5 bg-green-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">En proceso</p>
						</div>
						{/* LINEA DISEÑO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-green-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO DESARROLLO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-green-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-green-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA DESARROLLO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg animate-pulse bg-gradient-to-r from-green-400 to-red-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO PUBLICADO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-red-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-red-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">Publicado</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
						{/* LINEA PUBLICADO */}
						<div
							className="mt-[14px] ml-[-64px] h-2 rounded-lg bg-red-300"
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO TERMIANDO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div className="w-9 h-9 flex items-center mb-2 justify-center bg-red-300 rounded-full drop-shadow-md">
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div className="w-5 h-5 bg-red-200 rounded-full"></div>
							</div>
							<p className="text-base font-semibold">
								Sitio terminado
							</p>
							<p className="text-sm font-normal">No empezado</p>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<h4 className="font-semibold text-xl text-red-500">
							Subscipción no activa
						</h4>
						<p className="text-sm">
							Activa la subscripción para publicar tu sitio.
						</p>
						<button className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
							Subscribirme
							<MoveRight color="#ffffff" size={22} />
						</button>
					</div>

					<p className="w-full mt-7 text-center text-xs text-gray-400">
						El tiempo de desarrollo del sitio web puede ser de hasta
						un mes.
					</p>
				</div>

				<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-full">
					<div className="flex items-center mb-3 justify-between">
						<h4 className="font-semibold text-3xl">
							Leo García´s Portfolio
						</h4>
						<Globe size={20} className="opacity-50" />
					</div>
					<h3 className="font-normal text-base text-indigo-400 mb-5">
						leogarciag.com
					</h3>

					<div className="flex items-center gap-5 mb-5">
						<div className="bg-gray-100 rounded-xl p-10 mt-5 w-full">
							<div className="flex items-center mb-3 justify-between">
								<h3 className="font-medium text-base">
									Todos los website
								</h3>
								<Eye size={20} className="opacity-50" />
							</div>
							<h4 className="font-semibold text-3xl">
								130 visitas
							</h4>
							<p className="text-xs opacity-50">
								+30% que la semana pasada
							</p>
						</div>
						<div className="bg-gray-100 rounded-xl p-10 mt-5 w-full">
							<div className="flex items-center mb-3 justify-between">
								<h3 className="font-medium text-base">
									Red social que atrae más tráfico
								</h3>
								<Users size={20} className="opacity-50" />
							</div>
							<h4 className="font-semibold text-3xl">Facebook</h4>
							<p className="text-xs opacity-50">
								Instagram como segundo lugar
							</p>
						</div>
						<div className="bg-gray-100 rounded-xl p-10 mt-5 w-full">
							<div className="flex items-center mb-3 justify-between">
								<h3 className="font-medium text-base">
									Dispositivo que tiene más tráfico
								</h3>
								<MonitorSmartphone
									size={20}
									className="opacity-50"
								/>
							</div>
							<h4 className="font-semibold text-3xl">
								Smartphone
							</h4>
							<p className="text-xs opacity-50">
								Computadora como segundo lugar
							</p>
						</div>
					</div>

					<div className="flex flex-col items-center">
						<p className="text-base font-medium">
							Necesitas atención con tu sitio, ¡contáctame!
						</p>
						<div className="flex items-center gap-5 mb-10">
							<button className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
								{/* <Phone color="#ffffff" size={15} /> */}
								(618) 364 1448
							</button>
							<button className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
								{/* <Mail color="#ffffff" size={15} /> */}
								leogjli66@gmail.com
							</button>
						</div>
						<div className="flex items-center gap-3 mb-1">
							<p className="text-sm font-medium">
								Sitio publicado desde el 20 de diciembre de
								2023.
							</p>
							<button className="p-0 text-red-400 text-sm underline bg-transparent cursor-pointer font-medium">
								Cancelar subscripción
							</button>
						</div>
						<p className="text-xs opacity-30">
							Aun no puedes obtener el codigo fuente de este sitio
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClientsWebsitesPage;
