import { AppRouter } from './routes/AppRouter';
import HomeLayout from './layouts/HomeLayout';

const App = () => {
	return (
		<HomeLayout>
			<AppRouter />
		</HomeLayout>
	);
};

export default App;
