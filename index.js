import app from "./src/app.js";

const port = process.env.HTTP_SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});