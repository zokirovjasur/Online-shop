import React, { useEffect, useState } from "react";
import { LoginAPI } from "../service/api";

const Login = ({ setModal, setUser }) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    checked: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const dataSetter = (name, value) => {
    setData({ ...data, [name]: value });
    console.log(value);
  };

  const removeHandler = (e) => {
    if (e.target.id === "modal") {
      setModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => removeHandler(e));
    return () => {
      window.removeEventListener("click", (e) => removeHandler(e));
    };
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await LoginAPI(data.username, data.password);
      console.log(res); // Log the entire response to check its structure
      if (res?.data?.token) {
        console.log(res.message);
        setError(false);
        setModal(false);
        setIsLoggedIn(true); // User logged in successfully
        if (data.checked) {
          setUser(res.data.token);
          localStorage.setItem("user", res.data.token);
        }
        setData({ username: "", password: "", checked: false });
      } else {
        console.log("Token not found in the response!");
        setError(true); // Handle the case when no token is found
      }
    } catch (error) {
      console.log("Error during login:", error);
      setError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out the user
    setUser(null); // Clear the user data
    localStorage.removeItem("user"); // Remove token from localStorage
  };

  return (
    <div
      id="modal"
      className="flex bg-black bg-opacity-80 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isLoggedIn
                ? "Welcome, " + data.username
                : "Sign in to our platform"}
            </h3>
            <button
              type="button"
              onClick={() => setModal(false)}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            {!isLoggedIn ? (
              <form className="space-y-4" onSubmit={formSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={(e) => dataSetter(e.target.name, e.target.value)}
                    value={data.username}
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => dataSetter(e.target.name, e.target.value)}
                    value={data.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                {error && (
                  <p className="text-center text-sm text-red-500 mt-2">
                    Username yoki password xato!
                  </p>
                )}

                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        name="checked"
                        onChange={(e) =>
                          dataSetter(e.target.name, e.target.checked)
                        }
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className={`w-full text-white ${
                    isLoggedIn
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-gray-700 hover:bg-gray-800"
                  } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Login to your account
                </button>
                <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  onClick={handleLogout}
                  className={`${
                    isLoggedIn
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-700 hover:bg-blue-800"
                  } text-white px-4 py-2 rounded-md`}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
