import process from "node:process";
import fs from "node:fs";

const subcommand = process.argv[2];

if (subcommand === "read") {
    const petIndexStr = process.argv[3];
    const petIndex = Number(petIndexStr);
    
    fs.readFile("pets.json", "utf-8", (error, string) => {
        if (error) {
            throw error;
        }

        const pets = JSON.parse(string);
        if (petIndexStr === undefined) {
            console.log(pets);
        } else if (
            petIndex >= pets.length ||
            petIndex < 0 ||
            Number.isNaN(petIndex)
        ) {
            console.error("Usage: node pets.js read INDEX");
        process.exit(1);
        } else {
        console.log(pets[petIndex]);
        }
    });
    } else if (subcommand === "create") {

    const age = Number(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];
    const newPet = {age, kind, name};
    
    
    fs.readFile("pets.json", "utf8", (error, string) => {
      if (error) {
        throw error;
      }


      const pets = JSON.parse(string);
      
      pets.push(newPet);

      
      fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
        if (error) {
            throw error;
          }
      });
    });
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}