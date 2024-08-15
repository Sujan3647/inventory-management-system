import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

/* eslint-disable react/prop-types */
export const ProductCard = ({
  _id,
  name,
  description,
  price,
  supplier,
  quantity,
}) => {
  const [productName, setProductName] = useState(name);
  const [productDescription, setProductDescription] = useState(description);
  const [productPrice, setProductPrice] = useState(price);
  const [productSeller, setProductSeller] = useState(supplier);
  const [productQuantity, setProductQuantity] = useState(quantity);

  async function updateProductHandler() {
    const response = await axios.put(`${BACKEND_URL}/update-product/${_id}`, {
      name: productName,
      description: productDescription,
      supplier: productSeller,
      price: productPrice,
      quantity: productQuantity,
    });

    alert(response.data);
  }

  return (
    <div className="bg-slate-200 px-10 py-3">
      <h2 className="font-semibold text-2xl text-center">{productName}</h2>
      <p className="italic text-gray-700">{productDescription}</p>
      <p>
        <span className="font-semibold">Seller: </span>
        {productSeller}
      </p>
      <div className="flex justify-around mt-6">
        <p>
          <span className="font-semibold">Price: </span>
          {productPrice}
        </p>
        <p>
          <span className="font-semibold">Quantity: </span> {productQuantity}
        </p>
      </div>
      <div className="mt-1 flex justify-around">
        <Popover>
          <PopoverTrigger>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md">
              Update
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Update Product</h4>
                <p className="text-sm text-muted-foreground">
                  Set the details of the product.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Name of the product"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="description">Product Description</Label>
                  <Input
                    id="description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Description of the product"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="seller">Product seller</Label>
                  <Input
                    id="seller"
                    value={productSeller}
                    onChange={(e) => setProductSeller(e.target.value)}
                    placeholder="Seller of the product"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Price of the product"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Quantity of the product"
                    className="col-span-2 h-8"
                  />
                </div>
                <button
                  onClick={updateProductHandler}
                  className="bg-blue-500 p-1 text-white"
                >
                  Update Product
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <button
          onClick={async () => {
            const response = await axios.delete(
              `${BACKEND_URL}/delete-product/${_id}`
            );
            alert(response.data);
          }}
          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
