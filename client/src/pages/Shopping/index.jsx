import Cart from "../../components/Cart";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Shopping = () => {
  return (
    <>
      <Navbar isHome={false} />
      <Cart />
      <Footer />
    </>
  );
};

export default Shopping;
