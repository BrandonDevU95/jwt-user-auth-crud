import './index.css';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProfileProvider } from './contexts/ProfileContext.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ProfileProvider>
			<App />
		</ProfileProvider>
	</BrowserRouter>
);
