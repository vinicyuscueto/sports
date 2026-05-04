import Navbar from "../../components/Navbar";
import ProductGrid from "../../components/ProductGrid";
import Footer from "../../components/Footer";

const Products = () => {
  return (
    <>
      <Navbar isHome={false} />
      <ProductGrid isFull={true} />
      <Footer />
    </>
  );
};

export default Products;
