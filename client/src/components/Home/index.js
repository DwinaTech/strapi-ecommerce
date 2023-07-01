import React from "react";
import Product from "./Product";
import { Row, Col } from "reactstrap";
import { useProducts } from "./useProducts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { categories, products } = useProducts();
  const navigate = useNavigate();

  const navigateToProductView = (url) => {
    navigate(url);
  };
  return (
    <div>
      <div className="home">
        <h2 style={{ textAlign: "center" }}>Enjoy our sales!</h2>
        {categories.length
          ? categories.map((category) => {
              const hasProducts = products.filter(
                (product) =>
                  product.attributes.category.data?.id === category?.id
              );
              return hasProducts && hasProducts.length ? (
                <>
                  <h2 className="category-title">{category.attributes.name}</h2>
                  <Row key={category.id} className="category">
                    {hasProducts.map((product) => (
                      <Col
                        sm="12"
                        md="3"
                        key={product.id}
                        onClick={() =>
                          navigateToProductView(
                            `/product-details/${product.id}`
                          )
                        }
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};

export default Home;
