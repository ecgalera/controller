// FileSystem----------------------------------------------
import CartsManager from "./fs/manager/CartManager.js";
import ProductsManager from "./fs/manager/ProductManager.js";

 export const cartsManager = new CartsManager();
 export const productManager = new ProductsManager();

 // MongoDB -------------------------------------------------
 import CartManager from "./mongodb/manager/cartManager.js";
 import ProductManager from "./mongodb/manager/productsManagers.js";
 import UserManager from "./mongodb/manager/userManager.js";

 export const cm = new CartManager();
 export const pm = new ProductManager();
 export const um = new UserManager();
