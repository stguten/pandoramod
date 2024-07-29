import jwt from 'jsonwebtoken';
import * as usuarioController from "./usuario.controller.js";

async function userLogin(req, res) {
    const { username, password } = req.body;

    const userProfile = await usuarioController.pegarUsuarioController(username);

    if (userProfile && await bcrypt.compare(password, userProfile.senha)) {
        const token = jwt.sign({ id: userProfile.id, login: userProfile.login }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ auth: true, token, userProfile });
    }
    return res.status(401).json({ auth: false, token: null });
}

async function verifyJWT(req, res, next) {
    if (!req.headers['authorization']) return res.status(401).json({ auth: false, message: 'Acesso não autorizado, token não informado.' });
    try {
        const [type, token] = req.headers['authorization'].split(' ')[1];
        if (type !== 'Bearer') return res.status(401).json({ auth: false, message: 'Acesso não autorizado, tipo de token invalido.' });
        if (!token) return res.status(401).json({ auth: false, message: 'Acesso não autorizado, token não informado.' });

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return res.status(401).json({ auth: false, message: 'Acesso não autorizado, token invalido.' });
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ auth: false, message: 'Erro Interno.' });
    }
}

async function userLogout(_, res) {
    res.status(200).json({ auth: false, token: null, userProfile: null });
}


export { userLogin, verifyJWT, userLogout };