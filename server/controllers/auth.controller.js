import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import config from './../../config/config.js'


    const signin = async (req, res) => { 
        try {
        let user = await User.findOne({ "email": req.body.email }) 
        if (!user)
        return res.status(401).json({ error: "User not found" }) 
        if (!user.authenticate(req.body.password)) {
        return res.status(401).send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret) 
        res.cookie('t', token, { expire: new Date() + 9999 }) 
        return res.json({
        token, 
        user: {
        _id: user._id, 
        name: user.name,
        email: user.email 
        }
        })
        } catch (err) {
        return res.status('401').json({ error: "Could not sign in" }) 
        }
        

}
const signout = (req, res) => { 
    res.clearCookie("t")
return res.status(200).json({ 
message: "signed out"
}) 

}
const requireSignin = expressjwt({ 
    secret: config.jwtSecret, 
    algorithms: ["HS256"],
    userProperty: 'auth'
    })
    
    const hasAuthorization = (req, res, next) => { 
        const authorized = req.profile && req.auth
        && req.profile._id.toString() == req.auth._id.toString(); 
        if (!(authorized)) {
        return res.status(403).json({ 
        error: "User is not authorized"
        }) 
        } 
        next()
        }

        const hasConcertAuthorization = (req, res, next) => { 
            console.log("req.auth:", req.auth); // Should contain authenticated user's ID
            console.log("req.profile:", req.profile); // Should contain the concert with the owner ID
            const authorized = req.profile && req.auth
            && req.profile.owner == req.auth._id; 
            if (!(authorized)) {
            return res.status(403).json({ 
            error: "User is not authorized"
            }) 
            } 
            next()
            }

export default { signin, signout, requireSignin, hasAuthorization, hasConcertAuthorization }
