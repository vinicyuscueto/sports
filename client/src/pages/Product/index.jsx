import ProductGrid from "../../components/ProductGrid";
import ProductDetail from "../../components/ProductDetail";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Product = () => {
  return (
    <>
      <Navbar isHome={false} />
      <ProductDetail />
      <ProductGrid isFull={false} isFeatured={true} />
      <Footer />
    </>
  );
};

export default Product;
