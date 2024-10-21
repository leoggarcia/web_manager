import { AtSign, Key, MapPinHouse, MoveRight, Phone, User } from "lucide-react";

function AddClientForm({
	handleSubmitNewClient,
	updateClientFunction,
	addClient,
	cliente,
	formError,
}) {
	return (
		<form
			className="w-[500px] flex flex-col gap-3"
			onSubmit={handleSubmitNewClient}
		>
			<div>
				<label
					htmlFor="nombre"
					className="block text-sm font-medium text-gray-700"
				>
					Nombre completo
				</label>
				<div className="mt-1 relative">
					<User
						className="absolute top-1/2 opacity-50"
						size={20}
						style={{
							transform: 'translateY(-50%)',
							left: '0.75rem',
						}}
					/>
					<input
						id="nombre"
						name="nombre"
						type="text"
						required
						className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={cliente.client_name}
						placeholder="Nombre del cliente"
						onChange={
							(e) =>
								updateClientFunction(
									'client_name',
									e.target.value,
								)
							/* setNombre(e.target.value) */
						}
					/>
				</div>
			</div>
			<div className="w-full">
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<div className="mt-1 relative">
					<AtSign
						className="absolute top-1/2 opacity-50"
						size={20}
						style={{
							transform: 'translateY(-50%)',
							left: '0.75rem',
						}}
					/>

					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						disabled={!addClient}
						className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={cliente.email}
						placeholder="ejemplo@ejem.com"
						onChange={
							(e) => updateClientFunction('email', e.target.value)
							/* setEmail(e.target.value) */
						}
					/>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="w-1/2">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700"
					>
						Teléfono
					</label>
					<div className="mt-1 relative">
						<Phone
							className="absolute top-1/2 opacity-50"
							size={20}
							style={{
								transform: 'translateY(-50%)',
								left: '0.75rem',
							}}
						/>
						<input
							id="phone"
							name="phone"
							type="tel"
							autoComplete="current-phone"
							required
							className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={cliente.client_phone}
							placeholder="(618) 123 4567"
							onChange={
								(e) =>
									updateClientFunction(
										'client_phone',
										e.target.value,
									)
								/* setPhone(e.target.value) */
							}
						/>
					</div>
				</div>
				<div className="w-1/2">
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700"
					>
						Dirección
					</label>
					<div className="mt-1 relative">
						<MapPinHouse
							className="absolute top-1/2 opacity-50"
							size={20}
							style={{
								transform: 'translateY(-50%)',
								left: '0.75rem',
							}}
						/>
						<input
							id="address"
							name="address"
							type="text"
							required
							className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={cliente.client_address}
							placeholder="Calle Ejemplo #333, Zona Centro"
							onChange={
								(e) =>
									updateClientFunction(
										'client_address',
										e.target.value,
									)
								/* setAddress(e.target.value) */
							}
						/>
					</div>
				</div>
			</div>
			{addClient && (
				<div className="flex items-center gap-3">
					<div className="w-1/2">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Contraseña
						</label>
						<div className="mt-1 relative">
							<Key
								className="absolute top-1/2 opacity-50"
								size={20}
								style={{
									transform: 'translateY(-50%)',
									left: '0.75rem',
								}}
							/>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								value={cliente.password}
								placeholder="••••••••••••••"
								onChange={
									(e) =>
										updateClientFunction(
											'password',
											e.target.value,
										)
									/* setPassword(e.target.value) */
								}
							/>
						</div>
					</div>
					<div className="w-1/2">
						<label
							htmlFor="confirm_password"
							className="block text-sm font-medium text-gray-700"
						>
							Confirmar contraseña
						</label>
						<div className="mt-1 relative">
							<Key
								className="absolute top-1/2 opacity-50"
								size={20}
								style={{
									transform: 'translateY(-50%)',
									left: '0.75rem',
								}}
							/>
							<input
								id="confirm_password"
								name="confirm_password"
								type="password"
								required
								className="pl-10 text-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								value={cliente.confirm_password}
								placeholder="••••••••••••••"
								onChange={
									(e) =>
										updateClientFunction(
											'confirm_password',
											e.target.value,
										)
									/* setConfirmPassword(
                                                            e.target.value,
                                                        ) */
								}
							/>
						</div>
					</div>
				</div>
			)}

			<button
				type="submit"
				className="mt-5 flex items-center justify-center gap-3 px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
			>
				Continuar
				<MoveRight color="#ffffff" size={22} />
			</button>

			{formError && (
				<div className="mt-4 text-center text-sm text-red-600">
					{formError}
				</div>
			)}
		</form>
	);
}

export default AddClientForm;
