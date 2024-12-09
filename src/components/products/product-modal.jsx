import { useEffect, useState } from "react";
import { getProduct } from "../../service/api";
import useFetch from "../../hooks/useFetch";

const ProductModal = ({ productID, closeModal }) => {
  const { data, error, loading } = useFetch(
    `https://fakestoreapi.com/products/${productID}`
  );

  const removeHandler = (e) => {
    if (e.target.id == "card-modal") {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener("click", (e) => removeHandler(e));
    return () => {
      window.removeEventListener("click", (e) => removeHandler(e));
    };
  }, []);
  return (
    <div
      id="card-modal"
      className="fixed top-0 start-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center"
    >
      {!loading ? (
        error ? (
          <div className="w-full max-w-[700px] flex justify-center items-center h-[300px] rounded-lg bg-white relative">
            {" "}
            //! view buttondi error qismi
            <button
              className="absolute top-2 end-5 text-2xl"
              onClick={closeModal} //! view buttondi boskanda error chiqanda x bosib chiqish
            >
              <i className="fa fa-times"></i>
            </button>{" "}
            <img
              src="https://media1.tenor.com/m/6QG4Z51-JmQAAAAC/404-error.gif"
              alt="Error"
              width={540}
            />
          </div>
        ) : (
          <div className="w-full max-w-[700px] bg-white border border-gray-200 rounded-lg relative flex shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-shrink-0 max-w-[350px]">
              <img
                className="p-8 rounded-t-lg w-full h-[300px] object-contain"
                src={data.image}
                alt="data image"
              />
            </div>
            <div className="px-5 py-5 relative pb-[80px]">
              <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {data.title}
                </h5>
                <p className="text-sm text-gray-500 mt-3 line-clamp-6">
                  {data.description}
                </p>
                <div className="flex items-center mt-5 justify-between absolute p-5 bottom-0 start-0 end-0">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${data.price}
                  </span>
                  <div>
                    <button
                      onClick={closeModal}
                      className="rounded px-5 uppercase py-2 me-2"
                    >
                      <i className="fa fa-chevron-left me-2"></i>
                      Back
                    </button>
                    <button className="text-white bg-black hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:text-black">
                      <i className="fa fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full max-w-[700px] flex justify-center items-center h-[300px] rounded-lg bg-white">
          <i className="fa fa-circle-notch fa-spin text-5xl"></i>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
