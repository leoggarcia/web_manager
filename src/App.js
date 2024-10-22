import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
/* import { ManagerDashboard } from './components/ManagerDashboard';
import { ClientDashboard } from './components/ClientDashboard'; */
import { useAuthStore } from './stores/authStore';
import ManagerDashboardPage from './components/ManagerDashboardPage';
import useFetch from './hooks/useFetch';
import ManagerWebsites from './components/ManagerWebsites';
import ManagerClients from './components/ManagerClients';
import DashoardHeader from './components/DashoardHeader';
import ClientsWebsitesPage from './components/ClientsWebsitesPage';
import SuccessPaymentPage from './components/SuccessPaymentPage';

const PrivateRoute = ({ children }) => {
	const { fetchData, isLoading, error } = useFetch();

	const { checkAuth } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		checkLogged();
	}, []);

	async function checkLogged() {
		const user = await checkAuth({ fetchData, fetchError: error });

		if (
			user?.user_type === 'client' &&
			!location.pathname.includes('/client')
		) {
			navigate('/client');
		} else if (
			user?.user_type === 'manager' &&
			!location.pathname.includes('/manager')
		) {
			navigate('/manager');
		} else if (!user?.user_type) {
			navigate('/login');
		}
	}

	return children;
};

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				{/* <Route
					path="/manager"
					element={
						<PrivateRoute>
							<Navigate to="/manager/websites" />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manager/websites"
					element={
						<PrivateRoute>
							<ManagerDashboardPage>
								<ManagerWebsites />
							</ManagerDashboardPage>
						</PrivateRoute>
					}
				/>
				<Route
					path="/manager/clientes"
					element={
						<PrivateRoute>
							<ManagerDashboardPage>
								<ManagerClients />
							</ManagerDashboardPage>
						</PrivateRoute>
					}
				/> */}
				<Route
					path="/client"
					element={
						<PrivateRoute>
							<DashoardHeader />
							<ClientsWebsitesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/client/payment-success"
					element={
						<PrivateRoute>
							<DashoardHeader />
							<SuccessPaymentPage />
						</PrivateRoute>
					}
				/>
				<Route path="/" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
