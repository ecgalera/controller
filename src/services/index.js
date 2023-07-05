
// Persistencia : mongodb --------------------------------------
import ProductManager from "../dao/mongodb/manager/productsManagers.js";
// Persistencia : fileSystem ----------------------------------
// import ProductsManager from "../dao/fs/manager/ProductManager.js";

import ProductsService from "./product.service.js";



// Persistencia : mongodb --------------------------------------
import CartsManager from "../dao/mongodb/manager/cartManager.js";
// Persistencia : fileSystem ----------------------------------
// import CartsManager from "../dao/fs/manager/CartManager.js";

import CartsService from "./cart.service.js";



export const productService = new ProductsService(new ProductManager());

export const cartService = new CartsService(new CartsManager());