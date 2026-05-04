import Navbar from "../../components/Navbar";
import ProductGrid from "../../components/ProductGrid";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar isHome={true} />
      <ProductGrid isFull={false} isFeatured={true} />
      <ProductGrid isFull={false} isFeatured={false} />
      <Footer />
    </>
  );
};

export default Home;
