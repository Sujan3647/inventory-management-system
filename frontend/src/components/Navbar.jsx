import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

export const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSeller, setProductSeller] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  async function addProductHandler() {
    setProductName("");
    setProductDescription("");
    setProductSeller("");
    setProductPrice("");
    setProductQuantity("");

    const response = await axios.post(`${BACKEND_URL}/add-product`, {
      name: productName,
      description: productDescription,
      supplier: productSeller,
      price: productPrice,
      quantity: productQuantity,
    });

    alert(response.data);
  }

  return (
    <nav className="flex justify-between px-6 items-center py-6 bg-zinc-400">
      <a href="/" className="text-2xl tracking-tight font-semibold">
        Product <span className="text-purple-800">Inventory</span>
      </a>
      <ul className="flex items-center gap-6 font-semibold text-gray-600">
        <li className="hover:text-gray-800">
          <Popover>
            <PopoverTrigger>
              <button className="border p-2 rounded-md bg-gray-200">
                Add Product
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-100">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add New Product</h4>
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
                    onClick={addProductHandler}
                    className="bg-blue-500 p-1 text-white"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </nav>
  );
};
