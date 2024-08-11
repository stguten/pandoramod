import bcrypt from "bcrypt";
import { responseBuilder } from "../util/response.util.js";
import * as usuarioRepository from "../repository/usuario.repository.js";

async function adicionarUsuarioController(req, res) {
    try {
        const { usuario, email, senha } = req.body;
        if(await pegarUsuarioController(usuario)) return res.status(409).send(responseBuilder(409, "Usuário já existe"));
        const hashedPassword = await bcrypt.hash(senha, 10);
        const perfil = await usuarioRepository.adicionarUsuarioRepository(usuario, email, hashedPassword);
        return perfil
            ? res.status(201).send(responseBuilder(201, "Usuário adicionado com sucesso", perfil))
            : res.status(400).send(responseBuilder(400, "Erro ao adicionar usuário"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function pegarUsuarioController(usuario) {
    try {
        const userProfile = await usuarioRepository.listarUsuarioPorNomeRepostiory(usuario);
        return userProfile ? userProfile[0] : null;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

async function pegarUsuarioPorIdController(id) {
    try {
        const userProfile = await usuarioRepository.listarUsuarioPorIdRepostiory(id);
        return userProfile ? userProfile : null;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }    
}

async function atualizarUsuarioController(req, res) {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if(password) req.body.password = await bcrypt.hash(password, 10);
                
        const resultado = await usuarioRepository.atualizarUsuarioRepository(id, req.body);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Usuário atualizado com sucesso.", resultado))
            : res.status(400).send(responseBuilder(400, "Não foi possível atualizar o usuário."));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarUsuarioController(req, res) {
    const { id } = req.params;
    try {
        if(await pegarUsuarioPorIdController(id) === null) return res.status(409).send(responseBuilder(409, "Usuário já deletado ou não existente na base de dados"));
        const resultado = await usuarioRepository.deletarUsuarioRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Usuário deletado com sucesso"))
            : res.status(400).send(responseBuilder(400, "Erro ao deletar usuário"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function temAutoridade() {
    const { id } = req.params;
    if(req.userId === id || req.role === "admin") next();
    else return res.status(401).send(responseBuilder(401, "Você não tem autoridade para realizar essa operação"));
}

export {
    adicionarUsuarioController,
    pegarUsuarioController,
    atualizarUsuarioController,
    deletarUsuarioController,
    temAutoridade
}