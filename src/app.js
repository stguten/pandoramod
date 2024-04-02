import express from "express";
import path from "path";

import app from "./config/express.config.js";
import userRoutes from "./route/user.route.js";

const publicDir = path.join(process.cwd(), "public");

app.use("/", express.static(publicDir));

app.use("/user", userRoutes);


export default app;