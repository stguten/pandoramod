import { Router } from "express";
import { login, logout } from "../controller/login.controller.js";
import { createUser } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.post("/login", login);
userRoutes.post("/register", createUser);
userRoutes.get("/logout", logout);

export default userRoutes;

