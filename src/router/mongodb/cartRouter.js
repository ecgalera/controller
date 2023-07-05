import { Router } from "express";
//`import CartManger from "../../dao/fs/mongodb/manager/cartManager.js";`
// import {cm} from "../../dao/index.js";
// import cartModel from "../../dao/fs/mongodb/models/cartsModels.js";
// import mongoose from "mongoose";
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  deleteProducttoCart,
  deleteCart,
  updateProductInCart,
  getCartViews} from "../../controllers/mongo.controllers/cartControllers.js"


// const cm = new CartManger()

const router = Router();

router.get("/", getCarts);

router.get("/:cid", getCartById);

router.post("/", createCart);


router.post("/:cid/products/:pid", addProductToCart);

router.delete("/:cid/product/:pid", deleteProducttoCart);

router.delete("/:cid", deleteCart);

router.put("/:cid/products/:pid",updateProductInCart);

router.get("/", getCartViews);

export default router;



