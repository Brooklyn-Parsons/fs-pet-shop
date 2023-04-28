import fs from "node:fs";
import express from "express";

const server = express();
const port = 3000;

server.use((req, res, next) => {
    if (req.get("Content-Type") === "application/json") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            req.body = JSON.parse(body);
            next();
        });
    } else {
        next();
    }
});

server.get("/", (req, res) => {
    res.send("Blah!");
});

server.get("/pets", (req, res, next) => {
    fs.readFile("pets.json", "utf-8")
    .then((string) => {
        const pets = JSON.parse(string);
        res.send(pets);
    })
    .catch(next);
});


server.post("/pets", (req, res) => {
    const newPet = req.body;
    fs.readFile("pets.json", "utf-8")
    .then((string) => {
        const pets = JSON.parse(string);
        pets.push(newPet);
        return fs.writeFile("pets.json", JSON.stringify(pets)).then(() => {
            res.send(newPet);
        })
    })
});

server.get("/pets/:petIndex", (req, res, next) => {
    const petIndex = Number(req.params.petIndex);

    fs.readFile("pets.json", "utf-8", (error, string) => {
        if (error) {
            next(error);
            return;
        }
        
        const pets = JSON.parse(string);
        res.send(pets[petIndex]);
    });
});

server.use( (err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
