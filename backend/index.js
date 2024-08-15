import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectToDatabase from "./utils/connectToDatabase.js";
import ProductSchema from "./schemas/product.schema.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("An error occurred while fetching products");
  }
});

// Add a new product
app.post("/add-product", async (req, res) => {
  const { name, description, supplier, price, quantity } = req.body;
  if (!name || !description || !supplier || !price || !quantity) {
    return res.status(400).send("Please provide all required fields");
  }

  const product = {
    name,
    description,
    supplier,
    price,
    quantity,
  };

  try {
    const newProduct = new ProductSchema(product);
    await newProduct.save();
    res.status(201).send("Product added successfully");
  } catch (error) {
    res.status(500).send("An error occurred while adding the product");
  }
});

// Update an existing product
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, supplier, price, quantity } = req.body;
  if (!name || !description || !supplier || !price || !quantity) {
    return res.status(400).send("Please provide all required fields");
  }

  const product = {
    name,
    description,
    supplier,
    price,
    quantity,
  };

  try {
    await ProductSchema.findByIdAndUpdate(id, product);
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(500).send("An error occurred while updating the product");
  }
});

// Delete an existing product
app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductSchema.findByIdAndDelete(id);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send("An error occurred while deleting the product");
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase();
});
