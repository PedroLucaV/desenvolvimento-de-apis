import express from "express";
const PORT = 3333;

const app = express();

app.get("/users", (req, res) => {
    res.status(200).json([
        "pessoa 1",
        "pessoa 2",
        "pessoa 3"
    ])
});

app.post("/users", (req, res) => {
    res.status(201).json([
        "pessoa 1",
        "pessoa 2",
        "pessoa 3",
        "pessoa 4"
    ])
});

app.put("/users", (req, res) => {
    res.status(200).json([
        "pessoa 1",
        "pessoa 10",
        "pessoa 3",
        "pessoa 4"
    ])
});

app.delete("/users", (req, res) => {
    res.status(204).json([
        "pessoa 10",
        "pessoa 3",
        "pessoa 4"
    ])
});

app.listen(PORT, () => {
    console.log("Servidor on port "+PORT);
});