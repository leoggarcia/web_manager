import DashoardHeader from './DashoardHeader';

function ManagerDashboardPage({children}) {

	return (
		<>
			<DashoardHeader />
            {
                children
            }
		</>
	);
}

export default ManagerDashboardPage;
