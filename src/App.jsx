import { useEffect, useState } from "react";
import { Navbar, Products } from "./components";
import { getProducts } from "./service/api";
import useFetch from "./hooks/useFetch";
import Sort from "./components/sort";

const App = () => {
  const [user, setUser] = useState(null);
  const [sortedProducts, setSortedProducts] = useState(null);
  const ls = localStorage.getItem("user");
  useEffect(() => {
    if (ls) {
      setUser(ls);
    }
  }, []);
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products"
  );

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Sort products={data} setSortedProducts={setSortedProducts} />

      {error && (
        <div className="py-20 items-center min-h-[calc(100vh-75px)] flex justify-center text-5xl text-red-500">
          <img
            src="https://media1.tenor.com/m/6QG4Z51-JmQAAAAC/404-error.gif"
            alt="Error"
            width={1050}
          />
        </div>
      )}
      {loading ? (
        <div className="text-center text-5xl text-gray-400 py-20">
          <i className="fa fa-circle-notch fa-spin"></i>{" "}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          Xato yuz berdi: {error.message}
        </div>
      ) : (
        <Products user={user} products={sortedProducts || data} />
      )}
    </div>
  );
};

export default App;
