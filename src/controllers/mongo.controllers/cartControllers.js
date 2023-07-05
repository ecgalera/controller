
import {cartService} from "../../services/index.js";

export const getCarts = async (req, res) => {
    const carts = await cartService.getCarts();
    res.send(carts);
}

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const carts = await cartService.getCartById({ _id: cid });
        if (!carts)
            res.status(404).send({ status: "error", error: "product not found" });
        res.send({ status: "succes", payload: carts });
    } catch (err) {
        console.log(err);
    }
}

export const createCart = async (req, res) => {
    try {
        await cartService.createCart();
        res.send("cart created");
    } catch (error) {
        console.log(error);
        return res.status(404).send({ status: "error", error: "cart not created" });
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const addProductCart = await cartService.addProductToCart(cid, pid);
        res.send({ status: "succes", payload: addProductCart });
    } catch (err) {
        console.log(err);
    }
}

export const deleteProducttoCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const deletedProductCart = await cartService.deleteProductToCart(cid, pid);
        res.send({ status: "succes", payload: deletedProductCart });
    } catch (err) {
        console.log(err);
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const deletedCart = await cartService.deleteCart(cid);
        res.send({ status: "success", payload: deletedCart });
    } catch (err) {
        console.log(err);
    }
}

export const updateProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const newQuantity = req.body;
        const updatedCart = await cartService.updateProductInCart(
            cid,
            pid,
            newQuantity
        );

        res.send({ status: "success", payload: updatedCart });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error", error: err.message });
    }
}

export const getCartViews = async (req, res) => {
    const carts = await cartService.getCarts();
    console.log(carts)
    res.render("cart", { carts });
}



