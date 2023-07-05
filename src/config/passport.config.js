import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import local from "passport-local";

import { um } from "../dao/index.js"
import { createHash, validatePassword } from "../services/auth.js";
import { cookieExtractor } from "../utils.js";


const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;

const initializePassportStrategies = () => {

    // Register con passport ----------------------
    passport.use(
        "register",
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, email, passwort, done) => {
                try {
                    const { firstName, lastName, role } = req.body;
                    const exists = await um.getUserBy({ email });
                    if (exists) return done(null, false, { message: "User already exists" });
                    // si el users no existe lo ingreso para lo cual lo primero que hago es hashed el password
                    const hashedPassword = await createHash(passwort);
                    const newUser = {
                        name: `${firstName} ${lastName}`,
                        email,
                        role,
                        password: hashedPassword
                    }
                    const result = await um.createUser(newUser);
                    return done(null, result);
                } catch (error) {
                    return done(error)
                }
            }
        )
    );

    //Login con Passport -----------------------------------------

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" },
            async (email, password, done) => {
                let resultUser;
                try {
                    if (email === "admin@admin.com" && password === "123") {
                        // si se cumple el if registro al usuario admin:
                        resultUser = {
                            name: "Admin",
                            id: 0,
                            role: "Admin"
                        }
                        return done(null, result);
                    }
                    const user = await um.getUserBy({ email });
                    console.log(user)
                    // si el usuario no es encontrado
                    if (!user) return done(null, false, { message: "User not found" });
                    // si el usuario es encontrado tengo que validad el password
                    const isValidPassword = await validatePassword(password, user.password);
                    if (!isValidPassword) return done(null, false, { message: "Incorrect credentials" });
                    // si el usuario existe y la contraseña es correcta devulevo los datos del usuario
                    resultUser = {
                        name: user.name,
                        id: user._id,
                        role: user.role
                    }
                    return done(null, resultUser)
                } catch (error) {
                    return done(error)
                }
            }
        ));
    // JWT cons passport -------------------------------------
    passport.use("jwt",
        new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "jwtSecret",
        }, async (payload, done) => {
            try {
                return done(null, payload);
            } catch (error) {
                return done(error);
            }
        }));

    passport.use("current",
        new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "jwtSecret",
        }, async (payload, done) => {
            try {
                return done(null, payload);
            } catch (error) {
                return done(error);
            }
        }))

};

export default initializePassportStrategies;