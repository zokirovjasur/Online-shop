import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UseDebounce from "../hooks/useDebounce";

export default function Sort({ setSortedProducts }) {
  const [ctg, setCtg] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = UseDebounce(searchValue, 100); //! Debounce qo‘shildi
  const {
    data: categories,
    error,
    loading,
  } = useFetch("https://fakestoreapi.com/products/categories");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (ctg === "all") {
          const response = await fetch("https://fakestoreapi.com/products");
          if (!response.ok) throw new Error("Failed to fetch products");
          const allProducts = await response.json();
          setProducts(allProducts);
        } else {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${ctg}`
          );
          if (!response.ok)
            throw new Error("Failed to fetch category products");
          const categoryProducts = await response.json();
          setProducts(categoryProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [ctg]);

  useEffect(() => {
    const filteredProducts = debouncedSearchValue
      ? products.filter((product) =>
          product.title
            ?.toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
        )
      : products;
    setSortedProducts(filteredProducts);
  }, [debouncedSearchValue, products, setSortedProducts]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center py-10 container">
      <form className="mx-auto flex gap-3">
        <div className="relative min-w-[350px] max-w-md">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search Mockups, Logos..."
          />
        </div>
        <div>
          <select
            onChange={(e) => setCtg(e.target.value)}
            id="categories"
            value={ctg}
            className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          >
            <option value="all">All</option>
            {loading ? (
              <option value="">Loading...</option>
            ) : (
              categories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            )}
          </select>
        </div>
      </form>
    </div>
  );
}
