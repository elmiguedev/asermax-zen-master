const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.get("/ping", (req, res) => {
    res.send("pong")
});

app.listen(port, console.log(`escuchando en el puerto ${port}`));
