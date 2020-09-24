import React from "react";
import Navbar from "../Navbar/index";
import HomepageHeroSection from "../HomepageHeroSection";
import Footer from "../Footer/index";

const HomePage = () => {
	return ( <>
		<Navbar />
		<div className="homepage-container">
			<HomepageHeroSection />
		</div>
		<Footer />
	</>
	);
};

export default HomePage;
