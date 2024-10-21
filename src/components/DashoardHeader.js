import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import PopoverOptions from './PopoverOptions';
import useFetch from '../hooks/useFetch';
import { User } from 'lucide-react';

function DashoardHeader() {
	const { fetchData, isLoading, formError } = useFetch();
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className="flex items-center justify-between border border-b-gray-200 py-2 px-10">
			<div className="flex items-center gap-4">
				<h2 className="font-bold text-xl">Administrador</h2>
				{user?.user_type === 'manager' && (
					<>
						<div className="w-[2px] h-4 bg-black"></div>
						<ul className="flex items-center gap-3">
							<li
								onClick={() => {
									navigate('/manager/websites');
								}}
								className={
									(location.pathname.includes('/websites')
										? 'font-semibold underline'
										: '') +
									' text-sm cursor-pointer transition-all'
								}
							>
								Websites
							</li>
							<li
								onClick={() => {
									navigate('/manager/clientes');
								}}
								className={
									(location.pathname.includes('/clientes')
										? 'font-semibold underline'
										: '') +
									' text-sm cursor-pointer transition-all'
								}
							>
								Clients
							</li>
						</ul>
					</>
				)}
			</div>
			<PopoverOptions
				options={[
					/* {
						text: 'Editar perfil',
						onClick: () => {
							setClientIdToUpdate(client.id);
							openUpdateClient();
						},
					}, */
					{
						text: 'Logout',
						onClick: async () => {
							await logout();
							navigate('/login');
						},
					},
				]}
				position={'top'}
				buttonClassNames="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
			>
				<div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white">
					<User />
				</div>
			</PopoverOptions>
		</div>
	);
}
export default DashoardHeader;
