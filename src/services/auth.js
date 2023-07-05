import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";



// CreateHash-------------------------------------
export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts)
}

// ValidatePassword -----------------------------
export const validatePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

// generateToken ---------------------------------
export const generateToken = (user) => {
    return jwt.sign(user, "jwtSecret", { expiresIn: "1d" })
}

// passportCall ---------------------------------

export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {


        passport.authenticate(strategy, (error, user, info) => {
            if (error) return next(error);
            if (!options.strategyType) {
                console.log(`Route ${req.url} doesn t have defined a strategyType`);
                return res.sendServerError();
            };

            if (!user) {
                // que significa que no haya encontrado al usuario en cada caso: 
                switch (options.strategyType) {
                    case "jwt":
                        req.error = info.message ? info.message : info.toString;
                        return next();
                
                    case "locals":
                        return res.sendUnauthorized(info.message ? info.message : info.toString())
                }
            }

            req.user = user;
            next();
        })(req, res, next)
    }
}

