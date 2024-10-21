// src/components/LoginPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import useFetch from '../hooks/useFetch';
import { Key, MoveRight, User } from 'lucide-react';
import planet_l from '../assets/planet_l.svg';
import planet_r from '../assets/planet_r.svg';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formSubmitted, setFormSubmitted] = useState(false);

	const { fetchData, isLoading, error } = useFetch();
	const { checkAuth } = useAuthStore();
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	useEffect(() => {
		checkLogged();
	}, [checkAuth]);

	async function checkLogged() {
		const user = await checkAuth({ fetchData, fetchError: error });

		if (user) {
			navigate(user.user_type === 'manager' ? '/manager' : '/client');
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setFormSubmitted(true);

		try {
			const userData = await fetchData('/api/auth/local', {
				method: 'POST',
				body: JSON.stringify({
					identifier: email,
					password: password,
				}),
			});

			/* SAVE TOKEN */
			const token = userData.jwt;
			localStorage.setItem('token', token);

			login(userData.user);

			navigate(
				userData.user.user_type === 'manager' ? '/manager' : '/client',
			);
		} catch (error) {
			console.error('Login failed', error);
		}
	};

	/* const handleSubmit = async (e) => {
		e.preventDefault();

		setFormSubmitted(true);

		try {
			const userData = await fetchData('/api/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});

			login(userData);

			navigate(userData.user_type === 'manager' ? '/manager' : '/client');
		} catch (error) {
			console.error('Login failed', error);
		}
	}; */

	return (
		<div className="h-screen w-screen relative overflow-hidden box-border flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<img
				src={planet_l}
				className="absolute left-0 pointer-events-none -z-10"
			/>
			<img
				src={planet_r}
				className="absolute right-0 pointer-events-none -z-10"
			/>

			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-10 text-3xl text-center font-semibold text-portfolio-black leading-tight">
					Ingresa a tu cuenta
				</h2>
			</div>

			<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-transparent py-8 px-4 sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-base font-medium text-gray-700"
							>
								Email
							</label>
							<div className="mt-1 relative">
								<User
									className="absolute top-1/2 opacity-50"
									size={22}
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
									className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={email}
									placeholder="ejemplo@ejem.com"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-base font-medium text-gray-700"
							>
								Contraseña
							</label>
							<div className="mt-1 relative">
								<Key
									className="absolute top-1/2 opacity-50"
									size={22}
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
									className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={password}
									placeholder="••••••••••••••"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
							>
								{isLoading ? 'Iniciando...' : 'Inciar sesión'}{' '}
								<MoveRight color="#ffffff" size={22} />
							</button>
							<a
								href="tel:6183641448"
								className="block w-full mt-2 text-sm underline text-center"
							>
								¿No tienes un sitio web? <b>¡Contactame!</b>
							</a>
						</div>
					</form>

					{error && formSubmitted && (
						<div className="mt-4 text-center text-sm text-red-600">
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
