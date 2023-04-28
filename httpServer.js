import http from "node:http";
import fs from "node:fs";

http
.createServer(function (request, response){
    const petRegExp = /^\/pets\/(d+)$/;

     if(request.method === "GET" && request.url === "/pets"){
     fs.readFile("pets.json", "utf-8", (error, string) => {
         response.setHeader("Content-Type", "application/json");
         response.write(string);
         response.end();
        });
    }else if (request.method === "GET" && petRegExp.test(request.url)) {

        const petIndex = Number(request.url.match(petRegExp)(1));

        fs.readFile("pets.json", "utf-8", (error, string) => {
          response.setHeader("Content-Type", "application/json");
          const pets = JSON.parse(string);
          const pet = pets[petIndex];

        response.write(pet);
        response.end();
        });
     } else {
    response.write("Goodbye!");
    response.end();
} 
})
.listen(3000, function() {
    console.log("Listening on port 3000");
});