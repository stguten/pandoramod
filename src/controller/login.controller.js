import jwt from 'jsonwebtoken';
import { getUser } from './user.controller.js';

async function login(req, res){
    console.log(req.body);
    const { username, password } = req.body;

    const userContent = await getUser(username, password);

    if(userContent){
        const token = jwt.sign(userContent, "bananaseca", { expiresIn: '1h' });
        return res.status(200).json({ auth: true, token, userContent });
    }
    return res.status(401).json({ auth: false, token: null });
}

async function verifyJWT(req, res, next){
    const token = req.headers['authorization'].split(' ')[1];
    if(!token) return res.status(401).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, "bananaseca", function(err, decoded){
        if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
}

async function logout(req, res){
    res.status(200).json({ auth: false, token: null, userContent: null });
}


export { login, verifyJWT, logout};