import Navbar from '../components/Navbar';

const Home = ({ children }) => {
	return (
		<main>
			<Navbar />
			<div>{children}</div>
		</main>
	);
};
export default Home;
