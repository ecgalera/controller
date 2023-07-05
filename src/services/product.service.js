
export default class ProductsService {
    constructor(dao){
        this.dao = dao;
    }

    getProducts =()=>{
       return this.dao.getProducts();
    }

    getProductById =(params)=>{
        return this.dao.getProductById(params);
    }

    createProduct =(user)=>{
        return this.dao.createProduct(user);
    }

    updateProduct = (id, user)=>{
        return this.dao.updateProduct(id, user)
    }

    deleteProduct = (id)=>{
        return this.dao.deleteProduct(id)
    }

}