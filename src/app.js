import app from "./config/express.config.js";
import arquivoRoute from "./route/arquivo.route.js";
import autorRoutes from "./route/autor.route.js";
import categoriasRoutes from "./route/categoria.route.js";
import complementoRoutes from "./route/complemento.route.js";
import usuarioRoutes from "./route/usuario.route.js";
import swagger from "./config/swagger.config.js";
import { responseBuilder } from "./util/response.util.js";

swagger(app);
app.use("/arquivo", arquivoRoute);
app.use("/autor", autorRoutes);
app.use("/categoria", categoriasRoutes);
app.use("/complemento", complementoRoutes);
app.use("/usuario", usuarioRoutes);

app.get("/", (req, res) => {
    return res.redirect("/docs");
});
app.get("*", (_, res) => {
    res.status(404).send(responseBuilder(404, "Endpoint não encontrado."));
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(responseBuilder(500, "Erro interno."));
});

export default app;