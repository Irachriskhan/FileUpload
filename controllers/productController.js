const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  //if (!allProducts) res.send("No product found, please add products");
  res.status(StatusCodes.OK).json({ products });
};

module.exports = { createProduct, getAllProducts };
