import Layout from "~/components/Layout";

const Home = () => {
	return (
		<div className="bg-primary-800">
			<Layout>
				<h1 className="h-screen font-bold text-primary-200 font-ibm">WELCOME BACK ABDELH2O!</h1>
			</Layout>
		</div>
	);
};

Home.auth = true;

export default Home;