import bcrypt from 'bcrypt';
import { responseBuilder } from '../util/util.js';
import { addUserRepository, getUserRepository } from '../repository/user.repository.js';

async function createUser(req, res) {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const resultado = await addUserRepository([ username, hashedPassword ]);
    console.log(resultado);
    resultado ? res.status(200).send(responseBuilder(200, 'Usuario criado com sucesso')) : res.status(500).send(responseBuilder(500, 'Usuário não criado'));
    
}

async function getUser(username, password) {
    try {
        const userContent =  await getUserRepository([username]);    
        if (userContent === undefined) return false;
        const match = await bcrypt.compare(password, userContent.senha);
        if (!match) return false;
        delete userContent.senha;
        return userContent;
    } catch (error) {
        return false;
    }
}

export { createUser, getUser }