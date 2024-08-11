import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuarioController from "./usuario.controller.js";
import { responseBuilder } from '../util/response.util.js';

async function userLogin(req, res) {
    const { username, password } = req.body;

    let userProfile = await usuarioController.pegarUsuarioController(username);

    if (userProfile && await bcrypt.compare(password, userProfile.senha)) {
        userProfile = { id: userProfile.id, nome: userProfile.login, email: userProfile.email, role: userProfile.administador ? 'admin' : 'autor' };
        const token = jwt.sign(userProfile, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json(responseBuilder(200, 'Login efetuado com sucesso', [{ auth: true, token, userProfile}]));
    }
    return res.status(401).json(responseBuilder(401, 'Login ou senha inválidos', [{ auth: false, token: null, userProfile: null }]));
}

async function verifyJWT(req, res, next) {
    if (!req.headers['authorization']) return res.status(401).json(responseBuilder(401, 'Erro no header, informe um header correto.', [{ auth: false, token: null, userProfile: null }]));
    try {
        const [type, token] = req.headers['authorization'].split(' ');
        if (type !== 'Bearer') return res.status(401).json(responseBuilder(401, 'Metodo Invalido, Acesso não autorizado', [{ auth: false, token: null, userProfile: null }]));
        if (!token) return res.status(401).json(responseBuilder(401, 'Acesso não autorizado, token não informado', [{ auth: false, token: null, userProfile: null }]));

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return res.status(401).json(responseBuilder(401, 'Acesso não autorizado, token inválido', [{ auth: false, token: null, userProfile: null }]));
            req.userId = decoded.id;
            req.role = decoded.role;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseBuilder(500, `A operação gerou o seguinte erro: ${error.message}`, [{ auth: false, token: null, userProfile: null }]));
    }
}

async function userLogout(_, res) {
    res.status(200).json(responseBuilder(200, 'Logout efetuado com sucesso', [{ auth: false, token: null, userProfile: null }]));
}

export { userLogin, verifyJWT, userLogout };