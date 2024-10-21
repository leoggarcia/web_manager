import { Captions, ChevronDown, Globe, Receipt } from "lucide-react";

function AddWebsiteForm({
	handleSubmitNewWebsite,
	updateWebsite,
	websites,
	addClientWithoutWebsite,
	submitButtonTitle = 'Crear website',
}) {
	return (
		<form
			className="w-[500px] flex flex-col gap-3"
			onSubmit={handleSubmitNewWebsite}
		>
			<div>
				<label
					htmlFor="website_nombre"
					className="block text-sm font-medium text-gray-700"
				>
					Nombre del website
				</label>
				<div className="mt-1 relative">
					<Captions
						className="absolute top-1/2 opacity-50"
						size={20}
						style={{
							transform: 'translateY(-50%)',
							left: '0.75rem',
						}}
					/>
					<input
						id="website_nombre"
						name="website_nombre"
						type="text"
						required
						className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={websites[0]?.name}
						placeholder="Nombre del website"
						onChange={(e) => {
							updateWebsite(0, 'name', e.target.value);
						}}
						/* onChange={(e) => setNombre(e.target.value)} */
					/>
				</div>
			</div>
			<div className="w-full">
				<label
					htmlFor="url"
					className="block text-sm font-medium text-gray-700"
				>
					URL del website
				</label>
				<div className="mt-1 relative">
					<Globe
						className="absolute top-1/2 opacity-50"
						size={20}
						style={{
							transform: 'translateY(-50%)',
							left: '0.75rem',
						}}
					/>

					<input
						id="url"
						name="url"
						type="text"
						autoComplete="url"
						required
						className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={websites[0].url}
						placeholder="https://www.ejemplo.com"
						onChange={(e) => {
							updateWebsite(0, 'url', e.target.value);
						}}
						/* onChange={(e) => setEmail(e.target.value)} */
					/>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="w-1/2">
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-700"
					>
						Status
					</label>
					<div className="mt-1 relative">
						<ChevronDown
							className="absolute top-1/2 opacity-50"
							size={20}
							style={{
								transform: 'translateY(-50%)',
								left: '0.75rem',
							}}
						/>

						<select
							id="status"
							name="status"
							value={websites[0].status}
							className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							onChange={(e) => {
								updateWebsite(0, 'status', e.target.value);
							}}
						>
							<option value="desarrollo">Desarrollo</option>
							<option value="activo">Activo</option>
							<option value="inactivo">Inactivo</option>
						</select>
					</div>
				</div>
				<div className="w-1/2">
					<label
						htmlFor="cost"
						className="block text-sm font-medium text-gray-700"
					>
						Costo por mes
					</label>
					<div className="mt-1 relative">
						<Receipt
							className="absolute top-1/2 opacity-50"
							size={20}
							style={{
								transform: 'translateY(-50%)',
								left: '0.75rem',
							}}
						/>

						<input
							id="cost"
							name="cost"
							type="number"
							min={0}
							required
							className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={websites[0].cost}
							placeholder="$599.00"
							onChange={(e) => {
								updateWebsite(0, 'cost', e.target.value);
							}}
							/* onChange={(e) => setEmail(e.target.value)} */
						/>
					</div>
				</div>
			</div>
			<div className="w-full">
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700"
				>
					Descripción
				</label>
				<div className="mt-1 relative">
					<textarea
						onChange={(e) => {
							updateWebsite(0, 'description', e.target.value);
						}}
						placeholder="Descripción del website"
						id="description"
						name="description"
						rows={3}
						value={websites[0].description}
						className="text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					></textarea>
				</div>
			</div>

			<div className="flex items-center gap-3">
				{addClientWithoutWebsite && (
					<button
						type="button"
						className="w-full mt-5 flex items-center justify-center gap-3 px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-portfolio-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						onClick={addClientWithoutWebsite}
					>
						No agregar website
					</button>
				)}
				<button
					type="submit"
					className="w-full mt-5 flex items-center justify-center gap-3 px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
				>
					{submitButtonTitle}
				</button>
			</div>
			<p className="text-xs text-center">
				Por el momento solo se puede agregar un sitio por cliente
			</p>
		</form>
	);
}

export default AddWebsiteForm;
