import { Router } from "express";
// import ProductManagers from "../../dao/fs/mongodb/manager/productsManagers.js"
// import {pm} from "../../dao/index.js"

// const pm = new ProductManagers();
import {getProducts, createProduct, getProductById, updateProduct, deleteProduct} from "../../controllers/mongo.controllers/productControllers.js"

const router = Router();

router.get("/",  getProducts);

router.post("/", createProduct);

router.get("/:pid", getProductById);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct)


export default router;



