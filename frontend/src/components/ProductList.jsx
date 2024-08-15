import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../lib/constants";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/products`);
    setProducts(data);
  };
  fetchProducts();

  return (
    <div className="max-w-lg">
      <h1 className="text-xl my-10 px-10 font-semibold underline underline-offset-8">
        Products in inventory:
      </h1>
      <div className="w-screen grid place-content-center grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};
