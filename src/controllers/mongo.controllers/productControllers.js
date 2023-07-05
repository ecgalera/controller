import { productService } from "../../services/index.js";



export const  getProducts = async (req, res) => {

    try {
        const products = await productService.getProducts();
        if (products.length == 0) {
            res.send({ message: "no hay productos cargados" })
        } else {
            res.send({ status: "success", payload: products })
        }
    } catch (error) {
        console.log("Producto no encontrado")
    }
}

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, code, status, stock } = req.body;
        if (!title || !description || !price || !category || !code || !status || !stock) return res.send({ status: "error", error: "datos incompletos" });
        const product = {
            title,
            description,
            price,
            category,
            code,
            status,
            stock
        };
        const createProduct = await productService.createProduct(product);
        res.send({ status: "success", payload: createProduct });

    } catch (error) {
        console.log("El producto no se creo ")
    }
}

export const getProductById = async (req, res) => {

    try {
        const { pid } = req.params;
        const producById = await productService.getProductById(pid);
        res.send({ status: "success", payload: producById });
    } catch (error) {
        console.log("error en el id")
    }
}

export const updateProduct = async (req, res) => {
    try {

        const { pid } = req.params;
        const product = req.body;
        const productUpdate = await productService.updateProduct(pid, product);
        res.send({ status: "success", payload: productUpdate });

    } catch (error) {
        console.log("Product no actualizado")
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const { pid } = req.params;
        const productDelete = await productService.deleteProduct(pid)
        res.send({ status: "success", payload: productDelete })

    } catch (error) {
        console.log("Producto no eliminado")
    }
}