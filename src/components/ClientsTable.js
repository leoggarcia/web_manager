import { Globe, Mail, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientsStore } from '../stores/clientsStore';
import useFetch from '../hooks/useFetch';
import { useAuthStore } from '../stores/authStore';
import { useWebsitesStore } from '../stores/websitesStore';
import PopoverOptions from './PopoverOptions';
import { text } from 'framer-motion/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function ClientsTable({
	openUpdateClient,
	openUpdateClientWebsites,
	setClientIdToUpdate,
}) {
	const { fetchData, isLoading, formError } = useFetch();
	const { clients, pagination, getClients, deleteClient } = useClientsStore();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const currentPage = searchParams.get('current_page') ?? 1;

	useEffect(() => {
		getClients({
			fetchData,
			fetchError: formError,
			currentPage: currentPage ?? 1,
		});
	}, [currentPage]);

	function copytextToClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	return (
		<>
			<Toaster />
			{/* TABLE */}
			<div className="flex flex-col mt-6">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden min-h-96 border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th
											scope="col"
											className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<button className="flex items-center gap-x-3 focus:outline-none">
												<span>Cliente</span>

												<svg
													className="h-3"
													viewBox="0 0 10 11"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
														fill="currentColor"
														stroke="currentColor"
														strokeWidth="0.1"
													/>
													<path
														d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
														fill="currentColor"
														stroke="currentColor"
														strokeWidth="0.1"
													/>
													<path
														d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
														fill="currentColor"
														stroke="currentColor"
														strokeWidth="0.3"
													/>
												</svg>
											</button>
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Websites
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Contacto
										</th>

										<th
											scope="col"
											className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Suscripción
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Cobro esperado por mes
										</th>

										<th
											scope="col"
											className="relative py-3.5 px-4"
										>
											<span className="sr-only">
												Edit
											</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
									{clients.length === 0 && (
										<tr>
											<td
												colSpan="6"
												className="text-center py-4 text-gray-500 dark:text-gray-400"
											>
												No hay clientes
											</td>
										</tr>
									)}
									{clients.map((client, index) => {
										return (
											<tr
												key={client.id}
												className="hover:bg-gray-100 transition-all"
											>
												<td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
													<div>
														<h2 className="font-medium text-gray-800 dark:text-white ">
															{client.name ??
																'No name'}
														</h2>
													</div>
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<div>
														{JSON?.parse(
															client?.websites ??
																'[{}]',
														)[0]?.url ? (
															<>
																<p className="text-gray-500 text-base font-semibold dark:text-gray-400">
																	{
																		JSON.parse(
																			client?.websites ??
																				'',
																		)[0]
																			?.name
																	}
																</p>
																<h4 className="text-indigo-700 text-xs dark:text-gray-200 flex items-center gap-2 cursor-pointer">
																	<Globe
																		size={
																			15
																		}
																		className="opacity-50"
																	/>{' '}
																	{
																		JSON.parse(
																			client?.websites ??
																				'',
																		)[0]
																			?.url
																	}
																</h4>
															</>
														) : (
															<h4 className="text-indigo-300 text-xs dark:text-gray-200 flex items-center gap-2">
																<X
																	size={15}
																	className="opacity-50"
																/>
																No website
															</h4>
														)}
													</div>
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<div className=" flex items-center gap-2">
														{client.email && (
															<button
																title="Copiar email"
																className="rounded-full bg-indigo-400 dark:bg-gray-800 p-2 hover:bg-indigo-200 transition-all"
																onClick={() => {
																	copytextToClipboard(
																		client.email,
																	);
																}}
															>
																<Mail
																	color={
																		'#ffffff'
																	}
																	size={15}
																/>
															</button>
														)}
														{client.phone && (
															<button
																title="Copiar teléfono"
																className="rounded-full bg-indigo-400 dark:bg-gray-800 p-2 hover:bg-indigo-200 transition-all"
																onClick={() => {
																	copytextToClipboard(
																		client.phone,
																	);
																}}
															>
																<Phone
																	color={
																		'#ffffff'
																	}
																	size={15}
																/>
															</button>
														)}
													</div>
													{/* <h4 className="text-indigo-700 dark:text-gray-200 flex items-center gap-2">
														<Mail
															size={15}
															className="opacity-50"
														/>
														{client.email ??
															'No email'}
													</h4> */}
												</td>

												<td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
													{client?.subscription_active ? (
														<div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
															Activa
														</div>
													) : (
														<div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
															Inactivo
														</div>
													)}
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<h4
														className={
															(client?.subscription_active
																? 'text-gray-700'
																: 'text-gray-300') +
															' dark:text-gray-200 flex items-center gap-2'
														}
													>
														{client?.subscription_active ? (
															<>
																<b>
																	$
																	{
																		client?.subscription_amount
																	}
																	.00
																</b>{' '}
																por mes
															</>
														) : (
															'No subscription'
														)}
													</h4>
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<PopoverOptions
														options={[
															{
																text: 'Editar cliente',
																onClick: () => {
																	setClientIdToUpdate(
																		client.id,
																	);
																	openUpdateClient();
																},
															},
															{
																text: 'Editar websites',
																onClick: () => {
																	setClientIdToUpdate(
																		client.id,
																	);
																	openUpdateClientWebsites();
																},
															},
															{
																text: 'Eliminar',
																onClick: () => {
																	deleteClient(
																		{
																			fetchData,
																			fetchError:
																				formError,
																			clientId:
																				client.id,
																		},
																	);
																},
															},
														]}
														position={
															index === 0
																? 'top'
																: 'bottom'
														}
														buttonClassNames="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
															/>
														</svg>
													</PopoverOptions>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* PAGINATION */}
			<div className="mt-6 sm:flex sm:items-center sm:justify-between ">
				<div className="text-sm text-gray-500 dark:text-gray-400">
					Pagina{' '}
					<span className="font-medium text-gray-700 dark:text-gray-100">
						{currentPage ?? 1} de {pagination.totalPages}
					</span>
				</div>

				<div className="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						onClick={() => {
							if (parseInt(currentPage) === 1) return;

							navigate(
								'/manager/clientes?current_page=' +
									(parseInt(currentPage) - 1),
							);
						}}
						className={
							(parseInt(currentPage) === 1
								? 'text-gray-700 bg-white opacity-50 hover:bg-gray-100'
								: 'text-white bg-indigo-700 hover:bg-indigo-600') +
							' flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 border rounded-md sm:w-auto gap-x-2  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 rtl:-scale-x-100"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
							></path>
						</svg>

						<span>Anterior</span>
					</button>
					<button
						onClick={() => {
							if (parseInt(currentPage) === pagination.totalPages)
								return;

							navigate(
								'/manager/clientes?current_page=' +
									(parseInt(currentPage) + 1),
							);
						}}
						className={
							(parseInt(currentPage) === pagination.totalPages
								? 'text-gray-700 bg-white opacity-50 hover:bg-gray-100'
								: 'text-white bg-indigo-700 hover:bg-indigo-600') +
							' flex items-center justify-center w-1/2 px-5 py-2 text-sm  capitalize transition-colors duration-200 border rounded-md sm:w-auto gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
						}
					>
						<span>Siguiente</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 rtl:-scale-x-100"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}

export default ClientsTable;
