import { responseBuilder } from "../util/response.util.js";
import * as complementoRepository from "../repository/complemento.repository.js";

async function validarDadosDeRegistroUsuario(req, res, next) {
    const { username, email, password } = req.body;
    const errors = [];

    if (typeof username !== 'string' || username.length < 5) {
        errors.push({ field: 'username', message: 'Username deve ter pelo menos 5 caracteres.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Deve ser um email válido.' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    if (typeof password !== 'string' || password.length < 6 || password.match(passwordRegex) === null) {
        errors.push({ field: 'password', message: 'A Senha não cumpre os requisitos minimos.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

async function validarDadosDeLoginUsuario(req, res, next) {
    const { username, password } = req.body;
    const errors = [];

    if (typeof username !== 'string' || username.length < 5) {
        errors.push({ field: 'username', message: 'Username deve ter pelo menos 5 caracteres.' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    if (typeof password !== 'string' || password.length < 6 || password.match(passwordRegex) === null) {
        errors.push({ field: 'password', message: 'A Senha não cumpre os requisitos minimos.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

async function validarDadosDeAtualizacaoUsuario(req, res, next) {
    const { username, email, password } = req.body;
    const errors = [];

    if (username && (typeof username !== 'string' || username.length < 5)) {
        errors.push({ field: 'username', message: 'Username deve ter pelo menos 5 caracteres.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (typeof email !== 'string' || !emailRegex.test(email))) {
        errors.push({ field: 'email', message: 'Deve ser um email válido.' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    if (password && (typeof password !== 'string' || password.length < 6 || password.match(passwordRegex) === null)) {
        errors.push({ field: 'password', message: 'A Senha não cumpre os requisitos minimos.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

async function validarDadosDeDelecaoUsuario(req, res, next) {
    const { idUsuario } = req.params;
    const errors = [];

    if (isNaN(idUsuario)) {
        errors.push({ field: 'username', message: 'Username deve ter pelo menos 5 caracteres.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

async function temAutoridade(req, res, next) {
    const { id } = req.params;    
    const donoComplemento = await complementoRepository.listarComplementoPorIdRepository(id);
        
    if (req.userId === donoComplemento[0].idusuario || req.role === "admin") {
        next();
    } else {
        return res.status(401).send(responseBuilder(401, "Você não tem autoridade para realizar essa operação"));
    }
}

export {
    validarDadosDeRegistroUsuario,
    validarDadosDeLoginUsuario,
    validarDadosDeAtualizacaoUsuario,
    validarDadosDeDelecaoUsuario,
    temAutoridade
}