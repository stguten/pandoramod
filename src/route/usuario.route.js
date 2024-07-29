import { Router } from "express";
import * as loginController from "../controller/login.controller.js";
import * as usuarioController from "../controller/usuario.controller.js";

const usuarioRoutes = Router();
/**
 * @openapi
 * /usuario/login:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Logar um usuario.
 *     description: Realiza o login de um usuario e retorna um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: stguten
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario deslogado com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: true        
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       401:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno na consulta da categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 * 
 */
usuarioRoutes.post("/login", loginController.userLogin);
/**
 * @openapi
 * /usuario/logout:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Deslogar um usuario
 *     description: Encerra a sessão de um usuario removendo o token de acesso.
 *     responses:
 *       200:
 *         description: Retorna a lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario deslogado com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: false        
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       500:
 *         description: Erro interno na consulta de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 */
usuarioRoutes.get("/logout", loginController.userLogout);

/**
 * @openapi
 * /usuario/criar-usuario:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Criar um usuario.
 *     description: Cria um novo usuario, com login e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [login, email, senha]
 *             properties:
 *               login:
 *                 type: string
 *                 example: stguten
 *               email:
 *                 type: string
 *                 format: email
 *                 pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *                 example: 'exemplo@dominio.com'
 *               senha:
 *                 type: string
 *                 format: password
 *                 pattern: '^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$'
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario cadastrado com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: stguten        
 *                         nomeAutor:
 *                           type: string
 *                           example: stguten
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       400:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Usuario já existe. Usuario não cadastrado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno no cadastro de usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 * 
 */
usuarioRoutes.post("/criar-usuario", usuarioController.adicionarUsuarioController);
/**
 * @openapi
 * /usuario/atualizar-usuario/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuario
 *     summary: Atualizar um usuario.
 *     description: Atualiza um usuario, com login e senha.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id do usuario
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [login, email, senha]
 *             properties:
 *               login:
 *                 type: string
 *                 example: stguten
 *               email:
 *                 type: string
 *                 format: email
 *                 pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *                 example: 'exemplo@dominio.com'
 *               senha:
 *                 type: string
 *                 format: password
 *                 pattern: '^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$'
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario cadastrado com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: stguten        
 *                         nomeAutor:
 *                           type: string
 *                           example: stguten
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       401:
 *         description: Não autorizado. Token inválido ou usuário não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Não autorizado. Token inválido ou usuário não autorizado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: false
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       400:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Usuario já existe. Usuario não cadastrado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno no cadastro de usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 * 
 */
usuarioRoutes.put("/atualizar-usuario/:id", loginController.verifyJWT, usuarioController.atualizarUsuarioController);
/**
 * @openapi
 * /usuario/deletar-usuario:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuario
 *     summary: Deletar um usuario.
 *     description: Deleta um usuario, com login e senha.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id do usuario
 *         type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario deletado com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       400:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Usuario não encontrado. Usuario não deletado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       401:
 *         description: Não autorizado. Token inválido ou usuário não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Não autorizado. Token inválido ou usuário não autorizado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: false
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       500:
 *         description: Erro interno no cadastro de usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 * 
 */
usuarioRoutes.delete("/deletar-usuario/:id", loginController.verifyJWT, usuarioController.deletarUsuarioController);

export default usuarioRoutes;