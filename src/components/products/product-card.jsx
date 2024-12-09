import React from "react";

const ProductCard = ({ product, modalHandler, user }) => {
  const array = [1, 2, 3, 4, 5];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg relative pb-[50px] shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg w-full h-[300px] object-contain"
          src={product.image}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </a>
        <span className="absolute top-3 opacity-70 end-5">
          <i className="fa fa-eye me-1"></i>
          {product.rating.count}
        </span>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {array.map((a) =>
              Math.round(product.rating.rate) >= a ? (
                <i key={a} className="fa fa-star text-yellow-300"></i>
              ) : (
                <i key={a} className="fa fa-star text-gray-300"></i>
              )
            )}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product.rating.rate}
          </span>
        </div>
        <div className="flex items-center justify-between absolute bottom-0 start-0 end-0 p-5">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <div className="flex gap-2">
            {user && (
              <button className="bg-red-500 text-white rounded-md hover:bg-red-700 transition-all px-4 py-2">
                <i className="fa fa-trash-alt"></i>{" "}
              </button>
            )}

            <button
              onClick={() => modalHandler(product.id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
