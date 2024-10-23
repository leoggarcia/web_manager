import { Eye, Globe, MonitorSmartphone, MoveRight, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWebsitesStore } from '../stores/websitesStore';
import useFetch from '../hooks/useFetch';

function ClientWebsite({ website }) {
	const [websiteSubscription, setWebsiteSubscription] = useState(null);
	const [activeSubscription, setActiveSubscription] = useState(false);
	const [websiteStatus, setWebsiteStatus] = useState(1);
	const [websitePublishedDate, setWebsitePublishedDate] = useState(null);
	const [diseñoColor, setDiseñoColor] = useState('gray');
	const [desarrolloColor, setDesarrolloColor] = useState('gray');
	const [publicadoColor, setPublicadoColor] = useState('gray');
	const [terminadoColor, setTerminadoColor] = useState('gray');
	const [loadingSubscriptionButton, setLoadingSubscriptionButton] =
		useState(false);

	const { payWebsite, getWebsiteSubscription, cancelWebsiteSubscription } =
		useWebsitesStore();
	const { fetchData, fetchError } = useFetch();

	useEffect(() => {
		if (!website) return;

		getThisWebsiteSubscription();

		const status = parseInt(website.website_status.split('-')[1]);
		setWebsiteStatus(status);
		calcColors(status);
		formatPublishedDate();
	}, [website]);

	async function getThisWebsiteSubscription() {
		const website_subscription = await getWebsiteSubscription({
			fetchData,
			fetchError,
			websiteId: website.id,
		});

		setWebsiteSubscription(website_subscription);
		setActiveSubscription(
			website_subscription?.subscripcion_activa ?? false,
		);
	}

	function formatPublishedDate() {
		const fechaISO = website.publishedAt;

		// Crear un objeto Date a partir de la cadena ISO
		const fecha = new Date(fechaISO);

		// Opciones de formato
		const opciones = {
			day: 'numeric', // Día sin ceros iniciales
			month: 'long', // Nombre completo del mes
			year: 'numeric', // Año completo (4 dígitos)
		};

		// Crear formateador con idioma español
		const fechaFormateada = new Intl.DateTimeFormat(
			'es-ES',
			opciones,
		).format(fecha);

		setWebsitePublishedDate(fechaFormateada);
	}

	function calcColors(status) {
		if (status === 1) {
			setDiseñoColor('indigo');
			setDesarrolloColor('gray');
			setPublicadoColor('gray');
			setTerminadoColor('gray');
		} else if (status === 2) {
			setDiseñoColor('green');
			setDesarrolloColor('indigo');
			setPublicadoColor('gray');
			setTerminadoColor('gray');
		} else if (status === 3) {
			setDiseñoColor('green');
			setDesarrolloColor('green');
			setPublicadoColor('indigo');
			setTerminadoColor('gray');
		}
	}

	return (
		<div className="bg-white rounded-xl border shadow-sm border-gray-200 p-10 mt-5 w-full">
			<div className="flex items-center mb-3 justify-between">
				<h4 className="font-semibold text-3xl">{website.name}</h4>
				<Globe size={20} className="opacity-50" />
			</div>
			<h3
				onClick={() => {
					window.open('https://' + website.url, '_blank');
				}}
				className="font-normal text-base text-indigo-400 mb-5 cursor-pointer"
			>
				{website.url}
			</h3>

			{websiteStatus != 4 ? (
				<>
					{/* WEBSITE STATUS */}
					<div className="flex gap-0 mb-5">
						{/* CICULO DISEÑO */}
						<div className="flex flex-col items-center w-32 z-20">
							<div
								className={`bg-${diseñoColor}-400 w-9 h-9 flex items-center mb-2 justify-center rounded-full drop-shadow-md`}
							>
								{websiteStatus == 1 && (
									<div
										className={`bg-${diseñoColor}-300 w-6 h-6 absolute rounded-full animate-ping`}
									></div>
								)}
								<div
									className={`bg-${diseñoColor}-300 w-5 h-5 rounded-full`}
								></div>
							</div>
							<p className="text-base font-semibold">Diseño</p>
							<p className="text-sm font-normal">{websiteStatus == 1 ? "En proceso" : websiteStatus > 1 ? "Completado" : "No empezado"}</p>
						</div>
						{/* LINEA DISEÑO */}
						<div
							className={
								(websiteStatus == 1 && 'animate-pulse') +
								` mt-[14px] ml-[-64px] h-2 rounded-lg bg-gradient-to-r from-${diseñoColor}-400 to-${desarrolloColor}-400`
							}
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO DESARROLLO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div
								className={`w-9 h-9 flex items-center mb-2 justify-center bg-${desarrolloColor}-400 rounded-full drop-shadow-md`}
							>
								{websiteStatus == 2 && (
									<div
										className={`w-6 h-6 absolute  bg-${desarrolloColor}-400 rounded-full animate-ping`}
									></div>
								)}
								<div
									className={`w-5 h-5 bg-${desarrolloColor}-300 rounded-full`}
								></div>
							</div>
							<p className="text-base font-semibold">
								Desarrollo
							</p>
							<p className="text-sm font-normal">{websiteStatus == 2 ? "En proceso" : websiteStatus > 2 ? "Completado" : "No empezado"}</p>
						</div>
						{/* LINEA DESARROLLO */}
						<div
							className={
								(websiteStatus == 2 && 'animate-pulse') +
								` mt-[14px] ml-[-64px] h-2 rounded-lg bg-gradient-to-r from-${desarrolloColor}-400 to-${publicadoColor}-400`
							}
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO PUBLICADO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div
								className={`w-9 h-9 flex items-center mb-2 justify-center bg-${publicadoColor}-400 rounded-full drop-shadow-md`}
							>
								{
									websiteStatus == 3 && (
										<div className={`w-6 h-6 absolute  bg-${publicadoColor}-400 rounded-full animate-ping`}></div>
									)
								}
								<div
									className={`w-5 h-5 bg-${publicadoColor}-300 rounded-full`}
								></div>
							</div>
							<p
								className={
									(!activeSubscription
										? 'text-red-500 '
										: 'text-green-500 ') +
									'text-base font-semibold'
								}
							>
								Publicado
							</p>
							<p className="text-sm font-normal">{websiteStatus == 3 ? "En proceso" : websiteStatus > 3 ? "Completado" : "No empezado"}</p>
						</div>
						{/* LINEA PUBLICADO */}
						<div
							className={
								(websiteStatus == 3 && 'animate-pulse') +
								` mt-[14px] ml-[-64px] h-2 rounded-lg bg-gradient-to-r from-${publicadoColor}-400 to-${terminadoColor}-400`
							}
							style={{
								width: 'calc(20% + 128px)',
							}}
						></div>
						{/* CICULO TERMIANDO */}
						<div className="ml-[-64px] flex flex-col items-center w-32 z-20">
							<div
								className={`w-9 h-9 flex items-center mb-2 justify-center bg-${terminadoColor}-400 rounded-full drop-shadow-md`}
							>
								{/* <div className="w-6 h-6 absolute  bg-indigo-400 rounded-full animate-ping"></div> */}
								<div
									className={`w-5 h-5 bg-${terminadoColor}-300 rounded-full`}
								></div>
							</div>
							<p className="text-base font-semibold">
								Sitio terminado
							</p>
							<p className="text-sm font-normal">{websiteStatus == 4 ? "En proceso" : websiteStatus > 4 ? "Completado" : "No empezado"}</p>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<h4
							className={
								(!activeSubscription
									? 'text-red-500 '
									: 'text-green-500 ') +
								'font-semibold text-xl'
							}
						>
							Subscipción {activeSubscription && 'activa'}
						</h4>
						<p className="text-sm">
							{!activeSubscription
								? 'Activa la subscripción para publicar tu sitio automáticamentea.'
								: 'La publicación de tu sitio web se hará automáticamente.'}
						</p>
						{!activeSubscription && websiteSubscription?.id ? (
							<button
								onClick={async () => {
									setLoadingSubscriptionButton(true);
									await payWebsite({
										fetchData,
										fetchError,
										website_subscription_id:
											websiteSubscription?.id,
										website_price:
											website?.precio_stripe?.split(
												'-',
											)[1],
									});
									setLoadingSubscriptionButton(false);
								}}
								disabled={loadingSubscriptionButton}
								className={
									(loadingSubscriptionButton
										? 'opacity-50 '
										: 'opacity-100 ') +
									'mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
								}
							>
								Subscribirme
								<MoveRight color="#ffffff" size={22} />
							</button>
						) : (
							!websiteSubscription?.id && (
								<p className="font-semibold text-red-400 ">
									* Hay un error con la subscripción, manda un
									WhatsApp al (618) 364 1448
								</p>
							)
						)}
					</div>

					<p className="w-full mt-7 text-center text-xs text-gray-400">
						El tiempo de desarrollo del sitio web puede ser de hasta
						un mes.
					</p>
				</>
			) : (
				<>
					<div className="flex items-center gap-5 mb-5">
						<div className="bg-gray-100 rounded-xl p-10 mt-5 w-full">
							<div className="flex items-center mb-3 justify-between">
								<h3 className="font-medium text-base">
									Todos los website
								</h3>
								<Eye size={20} className="opacity-50" />
							</div>
							<h4 className="font-semibold text-3xl text-gray-300">
								{/* 130 visitas */}
								No hay datos
							</h4>
							<p className="text-xs opacity-50">
								{/* +30% que la semana pasada */}
								No hay datos
							</p>
						</div>
						<div className="bg-gray-100 rounded-xl p-10 mt-5 w-full">
							<div className="flex items-center mb-3 justify-between">
								<h3 className="font-medium text-base">
									Red social que atrae más tráfico
								</h3>
								<Users size={20} className="opacity-50" />
							</div>
							<h4 className="font-semibold text-3xl text-gray-300">
								{/* Facebook */}
								No hay datos
							</h4>
							<p className="text-xs opacity-50">
								{/* Instagram como segundo lugar */}
								No hay datos
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
							<h4 className="font-semibold text-3xl text-gray-300">
								{/* Smartphone */}
								No hay datos
							</h4>
							<p className="text-xs opacity-50">
								{/* Computadora como segundo lugar */}
								No hay datos
							</p>
						</div>
					</div>

					<div className="flex flex-col items-center">
						<p className="text-base font-medium">
							Necesitas atención con tu sitio, ¡contáctame!
						</p>
						<div className="flex items-center gap-5 mb-10">
							<a
								href="tel:(618) 364 1448"
								className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
							>
								{/* <Phone color="#ffffff" size={15} /> */}
								(618) 364 1448
							</a>
							<a
								href="mailto:leogjli66@gmail.com"
								className="mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
							>
								{/* <Mail color="#ffffff" size={15} /> */}
								leogjli66@gmail.com
							</a>
						</div>
						{activeSubscription ? (
							<div className="flex items-center gap-3 mb-1">
								<p className="text-sm font-medium">
									Sitio publicado desde el{' '}
									{websitePublishedDate ?? '...'}.
								</p>
								<button
									onClick={() => {
										cancelWebsiteSubscription({
											fetchData,
											fetchError,
											website_subscription_id:
												websiteSubscription.stripe_subscription_id,
											strapi_subscription_Id:
												websiteSubscription.id,
										});
									}}
									className="p-0 text-red-400 text-sm underline bg-transparent cursor-pointer font-medium"
								>
									Cancelar subscripción
								</button>
							</div>
						) : (
							<div className="flex items-center flex-col gap-0 mb-3">
								<p className="text-sm font-medium">
									Sitio no publicado por falta de pago.
								</p>
								<button
									onClick={async () => {
										setLoadingSubscriptionButton(true);
										await payWebsite({
											fetchData,
											fetchError,
											website_subscription_id:
												websiteSubscription?.id,
											website_price:
												website?.precio_stripe?.split(
													'-',
												)[1],
										});
										setLoadingSubscriptionButton(false);
									}}
									disabled={loadingSubscriptionButton}
									className={
										(loadingSubscriptionButton
											? 'opacity-50 '
											: 'opacity-100 ') +
										'mt-2 flex items-center justify-center gap-3 px-10 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
									}
								>
									Subscribirme
									<MoveRight color="#ffffff" size={22} />
								</button>
							</div>
						)}
						<p className="text-xs opacity-30">
							Aun no puedes obtener el codigo fuente de este sitio
						</p>
					</div>
				</>
			)}
		</div>
	);
}

export default ClientWebsite;
