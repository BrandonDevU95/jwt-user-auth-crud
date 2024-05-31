import { AppRouter } from './routes/AppRouter';
import Home from './layouts/Home';

const App = () => {
	return (
		<Home>
			<AppRouter />
		</Home>
	);
};

export default App;
