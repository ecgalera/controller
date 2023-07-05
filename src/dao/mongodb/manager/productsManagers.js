import productModel from "../models/productModel.js";

export default class ProductManager {

  getProducts = async () => {
    return productModel.find().lean();
  };

  getProductsById = (params) => {
    return productModel.findOne(params).lean();
  };

  createProduct = (product) => {
    return productModel.create(product);
  };

  updateProduct = (id, product) => {
    return productModel.findByIdAndUpdate(id, { $set: product });
  };

  deleteProduct = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}