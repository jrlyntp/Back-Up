import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/Hero";
import OverviewCounter from "./components/overview-counter/OverviewCounter";
import BannerDetails from "./components/bannerDetails/BannerDetails";
import Blogs from "./components/blogs/blogs";
import Footer from "./components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="dark:bg-gray-900 bg-white">
      <Navbar />
      <Hero />
      <OverviewCounter />
      <BannerDetails />
      <BannerDetails reverse={true} />
      <Blogs />
      <Footer />
    </div>
  );
}

export default App;
