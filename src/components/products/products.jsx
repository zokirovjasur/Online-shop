import React, { useState } from "react";
import ProductCard from "./product-card";
import ProductModal from "./product-modal";

const Products = ({ products, loading, user }) => {
  const [productModal, setProductModal] = useState(false);
  const [visible, setVisible] = useState(5);

  const modalHandler = (product) => {
    setProductModal(product);
  };

  const closeModal = () => {
    setProductModal(false);
  };

  return (
    <div className="container pb-10">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {!loading &&
          products
            .slice(0, visible)
            .map((p) => (
              <ProductCard
                user={user}
                modalHandler={modalHandler}
                key={p.id}
                product={p}
              />
            ))}
      </div>
      {loading && (
        <h1 className="text-5xl text-center my-10 text-gray-300">
          Products not found
        </h1>
      )}
      {productModal && (
        <ProductModal closeModal={closeModal} productID={productModal} />
      )}
      {products.length >= visible && (
        <div className="py-10 text-center">
          {" "}
          <button
            type="button"
            onClick={() => setVisible(visible + 5)}
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
