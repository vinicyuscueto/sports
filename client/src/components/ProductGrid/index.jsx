import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import "./style.css";

const ProductGrid = ({ isFeatured, isFull }) => {
  const { data: products, isLoading, error } = useProducts();

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const displayedProducts = useMemo(() => {
    if (!products) return [];

    const result = isFull
      ? products
      : products.filter((product) => product.hot === isFeatured);

    const shuffled = shuffleArray(result);
    return isFull ? shuffled : shuffled.slice(0, 10);
  }, [products, isFeatured, isFull]);

  const pageScroll = () => {
    window.scrollTo(0, 0);
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="product-grid">
      <div className="container">
        <h2>
          {isFull
            ? "TODOS OS PRODUTOS"
            : isFeatured
              ? "EM DESTAQUE"
              : "MAIS PRODUTOS"}
        </h2>
        <div className="row">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product?id=${encodeURIComponent(product.id)}`}
              className="product-grid-col"
              onClick={() => pageScroll()}
            >
              <img src={product.image} alt={product.name} />
              <div className="product-grid-box">
                {isFeatured && (
                  <span className="product-grid-featured">Em destaque</span>
                )}
                <div className="product-grid-info">
                  <h4>{product.name}</h4>
                  <span>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
