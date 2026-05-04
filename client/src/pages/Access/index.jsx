import Navbar from "../../components/Navbar";
import Auth from "../../components/Auth";
import Footer from "../../components/Footer";

const Access = () => {
  return (
    <>
      <Navbar isHome={false} />
      <Auth isSignup={false} />
      <Footer />
    </>
  );
};

export default Access;
