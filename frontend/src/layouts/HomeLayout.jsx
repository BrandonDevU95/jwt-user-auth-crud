import Navbar from '../components/Navbar';

const Home = ({ children }) => {
	return (
		<main>
			<Navbar />
			<div className="bg-slate-100">{children}</div>
		</main>
	);
};
export default Home;
