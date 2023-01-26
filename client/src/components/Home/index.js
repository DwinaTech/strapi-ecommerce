import React from "react";
import Product from "./Product";
import CustomNav from "../CustomNav";
import { Row, Col } from "reactstrap";
import { useProducts } from "./useProducts";

const Home = () => {
  const { categories, products } = useProducts();

  return (
    <div>
      <CustomNav />
      <div className="home">
        <h2 style={{ textAlign: "center" }}>Enjoy our sales!</h2>
        {categories.length &&
          categories.map((category) => {
            const hasProducts = products.filter(
              (product) => product.attributes.category.data.id === category.id
            );
            return hasProducts && hasProducts.length ? (
              <>
                <h2 className="category-title">{category.attributes.name}</h2>
                <Row key={category.id} className="category">
                  {hasProducts.map((product) => (
                    <Col sm="12" md="4" key={product.id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </>
            ) : null;
          })}
      </div>
    </div>
  );
};

export default Home;
