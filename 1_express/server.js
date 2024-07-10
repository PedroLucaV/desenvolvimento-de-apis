import express from "express";
const PORT = 3333;

const app = express();

app.get("/users", (req, res) => {
    res.status(200).json({msg: "GET"})
});

app.post("/users", (req, res) => {
    res.status(200).json({msg: "POST"})
});

app.put("/users", (req, res) => {
    res.status(200).json({msg: "PUT"})
});

app.delete("/users", (req, res) => {
    res.status(200).json({msg: "DELETE"})
});

app.patch("/users", (req, res) => {
    res.status(200).json({msg: "PATCH"})
});

app.listen(PORT, () => {
    console.log("Servidor on port "+PORT);
});