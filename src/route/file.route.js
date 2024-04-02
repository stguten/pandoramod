import { Router } from "express";

const fileRoutes = Router();

fileRoutes.get("/", async (req, res) => {
    const status = await getFile(req.params.id);
    res.json(status);
});

fileRoutes.post("/upload", upload.single("arquivo"), async (req, res) => {
    console.log(req.file);
    req.file ? res.send(req.file) : res.send("Erro ao enviar o arquivo");
});

fileRoutes.get("/:id", async (req, res) => {
    const file = await getFile(req.params.id);
    res.json(file);
});

fileRoutes.get("/autor", async (req, res) => {   
    res.json({});
});


export default fileRoutes;