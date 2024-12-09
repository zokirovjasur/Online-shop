import axios from "axios";

axios.interceptors.request.use((config) => {
  config.baseURL = "https://fakestoreapi.com";
  return config;
});

export const getProducts = async () => {
  const data = await fetch("/products").then((res) => res.json());
  return data;
};

export const getProduct = async (id) => {
  const data = await fetch(`/products/${id}`).then((res) => res.json());
  return data;
};

export const LoginAPI = async (username, password) => {
  const data = await axios.post(
    "/auth/login",
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const GetSortedProducts = async (ctg) => {
  const data = await axios.get(`/products/category/${ctg}`);
  return data;
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    console.log(`Product with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error during product deletion:", error);
  }
};
