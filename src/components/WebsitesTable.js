import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWebsitesStore } from '../stores/websitesStore';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import PopoverOptions from './PopoverOptions';
import { Toaster } from 'react-hot-toast';

function WebsitesTable({ openUpdateWebsite, setWebsiteToUpdate }) {
	const { fetchData, isLoading, formError } = useFetch();
	const { websites, pagination, getWebsites, deleteWebsite } =
		useWebsitesStore();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const currentPage = searchParams.get('current_page') ?? 1;

	useEffect(() => {
		getWebsites({
			fetchData,
			fetchError: formError,
			currentPage: currentPage ?? 1,
		});
	}, [currentPage]);

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
												<span>Website</span>

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
											className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Status
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Sobre el sitio
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Cliente
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Cobro
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
									{websites.length === 0 && (
										<tr>
											<td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<div>
													<h2 className="font-medium text-gray-800 dark:text-white ">
														No hay sitios
													</h2>
												</div>
											</td>
										</tr>
									)}

									{websites.map((website, index) => {
										return (
											<tr
												key={website.id}
												className="hover:bg-gray-100 transition-all"
											>
												<td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
													<div>
														<h2 className="font-medium text-gray-800 dark:text-white ">
															{website.name}
														</h2>
														<a className="text-sm font-normal text-indigo-700 dark:text-gray-400">
															{website.url}
														</a>
													</div>
												</td>
												<td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
													{website?.status ==
													'activo' ? (
														<div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
															Activa
														</div>
													) : website?.status ==
													  'inactivo' ? (
														<div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
															Inactivo
														</div>
													) : website?.status ==
													  'desarrollo' ? (
														<div className="inline px-3 py-1 text-sm font-normal text-yellow-500 bg-yellow-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
															Desarrollo
														</div>
													) : (
														<div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
															Desconocido
														</div>
													)}
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<div>
														<p className="text-gray-700 dark:text-gray-200 max-w-64 text-wrap">
															{
																website.description
															}
														</p>
													</div>
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													{website.client_name ? (
														<h4 className="text-indigo-700 dark:text-gray-200">
															{
																website.client_name
															}
														</h4>
													) : (
														<h4 className="text-indigo-300 dark:text-gray-200">
															No asignado
														</h4>
													)}
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<div>
														<h4 className="text-gray-700 text-xs dark:text-gray-200">
															Proximo cobro se
															realiza el 09/10
														</h4>
														<p className="text-gray-500 text-base font-semibold dark:text-gray-400">
															+ ${website.amount}
															.00
														</p>
													</div>
												</td>

												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<PopoverOptions
														options={[
															{
																text: 'Editar website',
																onClick: () => {
																	setWebsiteToUpdate(
																		website.id,
																	);
																	openUpdateWebsite();
																},
															},
															{
																text: 'Eliminar website',
																onClick: () => {
																	deleteWebsite(
																		{
																			fetchData,
																			fetchError:
																				formError,
																			websiteId:
																				website.id,
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
								'/manager/websites?current_page=' +
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
								'/manager/websites?current_page=' +
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

export default WebsitesTable;
