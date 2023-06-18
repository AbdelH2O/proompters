import AppLayout from "~/components/AppLayout";
// import Layout from "~/components/Layout";

const Home = () => {
	return (
		<div
			className="bg-primary-800"
			style={{
				background: "linear-gradient(90deg, #343A40 20.8px, transparent 1%) center, linear-gradient(#343A40 20.8px, transparent 1%) center, #6C757D",
				backgroundSize: "22px 22px",
			}}
		>
			{/* <Layout>
				<h1 className="h-screen font-bold text-primary-200 font-ibm">WELCOME BACK ABDELH2O!</h1>
			</Layout> */}
			<AppLayout>
				<h1 className="h-screen font-bold text-primary-200 font-ibm">WELCOME BACK ABDELH2O!</h1>
			</AppLayout>
		</div>
	);
};

Home.auth = true;

export default Home;