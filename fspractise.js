import fs from "fs";
import path from "path";
let tasks= []
const TASKS_FILE = path.join(process.cwd(), "tasks.json")

try {
    if(fs.existsSync(TASKS_FILE)){ // we try to check if file exists
        const filecontent = fs.readFileSync(TASKS_FILE, "utf-8") // try to read it 

        if(filecontent.trim === ""){
            tasks = []; // Treat as empty if no content
            console.warn(
                `${TASKS_FILE} is empty. Initializing with empty tasks.`
            );
        }else{
            tasks = JSON.parse(filecontent) // or else parse it and put it on our tasks array
            console.log("Tasks Read successfully")
        }
        console.log("Tasks loaded successfully!");

    }else{
        // agar exist hi nhi krti toh 
        fs.writeFileSync(TASKS_FILE, "[]", "utf-8")
        console.log("created New Tasks file")
    }
} catch (error) {
    console.error("Error reading or parsing tasks file:", error);
    // Depending on the error, you might want to exit or handle it differently
    process.exit(1);
}

console.log("Currently loaded tasks:", tasks);
