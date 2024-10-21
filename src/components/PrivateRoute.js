import { Route, Redirect } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, user_type } = useAuthStore();

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};
