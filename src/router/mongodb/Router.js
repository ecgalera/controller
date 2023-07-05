import { Router } from "express";
import { passportCall } from "../../services/auth.js";

export default class BaseRouter {
    constructor() {
        this.router = Router();  // estoy en el entorno de express;
        this.init();  // lo uso en SessionsRouter
    }

    init() { };
    getRouter = () => this.router;

    get(path,policies, ...callbacks) {
        this.router.get(path, passportCall("jwt",{strategyType: "jwt"}) ,this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    post(path,policies, ...callbacks) {
        this.router.post(path, passportCall("jwt",{strategyType: "jwt"}) , this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path,policies, ...callbacks) {
        this.router.put(path, passportCall("jwt",{strategyType: "jwt"}) , this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path,policies, ...callbacks) {
        this.router.delete(path, passportCall("jwt",{strategyType: "jwt"}) , this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    // generateCustomResponses --------------------------------
    generateCustomResponses = (req, res, next) =>{
        res.sendSuccess = message => res.send({status:"success", message});
        res.sendSuccesWithPayload = payload => res.send({status: "succes", payload});
        res.sendInternalError = error => res.status(500).send({status: "error", error});
        res.sendUnauthorized = error => res.status(400).send({status:"error", error});
        res.sendServerError = error => res.status(500).send({status:"error", error})
        next();
    };

    // handlePolicies-----------------------------------------
    handlePolicies = policies =>{
        return (req, res, next)=>{
            if(policies[0]==="PUBLIC") return next();
            // El usuario debería venir ya con el usuario parseado desde jwt:
            const user = req.user;
            // evaluo si el usuario viene o no: en este caso viene el user el user ya esta logeado
            if(policies[0]=== "NO_AUTH" && user) return res.status(401).send({status:"error", error: "Unauthorized"});
            // ahora evaluo si el user existe o no:
            if(policies[0]=== "NO_AUTH" && !user) return next(); // me tengo que loguear
            // A partir de aquí, si me interesa que exista el usuario:
            if(!user) return res.status(401).send({status: "error", error: req.error});
            if(!policies.includes(user.role.toUpperCase()))return res.status(403).send({status:"error", error: "Forbidden"});
            next();
        }
    }

    // applyCallbacks------------------------------------------
    applyCallbacks(callbacks){
        return callbacks.map(callbacks => async(...params)=>{
            try {
                await callbacks.apply(this,params)
            } catch (error) {
                params[1].sendINternalError(error)
            }
        })
    }

}