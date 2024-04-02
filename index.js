//import express from "express";
import app from "./src/app.js";/* 
import app from "./src/config/express.config.js";
import upload from "./src/config/multer.config.js";
import path from "path";
import { fileParsing } from "./src/controller/file.controller.js"; */

/* const publicDir = path.join(process.cwd(), "public");

app.use("/", express.static(publicDir));

app.post("/upload", upload.single("arquivo"), async (req, res) => {
    console.log(req.file);
    req.file ? res.send(req.file) : res.send("Erro ao enviar o arquivo");
}); */

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
