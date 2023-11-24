const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");

const uploadProductImage = async (req, res) => {
  if (!req.files) throw new CustomError.BadRequestError("No file uploaded");
  let productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image"))
    throw new CustomError.BadRequestError("Please upload image");

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize)
    throw new CustomError.BadRequestError("Upload an image less than 1Mb");

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  ); // determine the destination folder

  await productImage.mv(imagePath); // saving the image
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
