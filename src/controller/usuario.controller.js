import bcrypt from "bcrypt";
import { responseBuilder } from "../util/response.util.js";
import * as usuarioRepository from "../repository/usuario.repository.js";

async function adicionarUsuarioController(req, res) {
    try {
        const { usuario, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const resultado = await usuarioRepository.adicionarUsuarioRepository(usuario, email, hashedPassword);
        return resultado
            ? res.status(201).send(responseBuilder(201, "Usuário adicionado com sucesso", [{ usuario: usuario, nomeAutor: usuario }]))
            : res.status(400).send(responseBuilder(400, "Erro ao adicionar usuário", []));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`, []));
    }
}

async function pegarUsuarioController(usuario) {
    try {
        const userProfile = await usuarioRepository.pegarUsuarioRepostiory(usuario);
        return userProfile ? userProfile : null;
    } catch (error) {
        console.log(error);
        throw new Error(`A listagem gerou o seguinte erro:: ${error.message}`);
    }
}

async function atualizarUsuarioController(req, res) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const resultado = await usuarioRepository.atualizarUsuarioRepository(username, email, hashedPassword);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Usuário atualizado com sucesso."))
            : res.status(400).send(responseBuilder(400, "Não foi possível atualizar o usuário."));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarUsuarioController(req, res) {
    try {
        const { username } = req.params;
        const resultado = await usuarioRepository.deletarUsuarioRepository(username);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Usuário deletado com sucesso"))
            : res.status(400).send(responseBuilder(400, "Erro ao deletar usuário"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

export {
    adicionarUsuarioController,
    pegarUsuarioController,
    atualizarUsuarioController,
    deletarUsuarioController
}