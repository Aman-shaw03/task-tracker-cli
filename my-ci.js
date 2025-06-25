// my-cli.js
// console.log("process.argv:", process.argv);
// console.log("------------------------------------");
// console.log("Path to Node executable:", process.argv[0]);
// console.log("Path to script file:", process.argv[1]);
// console.log("------------------------------------");


// if (process.argv.length > 2) {
//     console.log("User arguments (starting from index 2):");
//     for (let i = 2; i < process.argv.length; i++) {
//         if(process.argv[i] === "hello") continue
//         if(process.argv[i] === "break") break
//         console.log(`Argument ${i - 1}: ${process.argv[i]}`);
//     }
// } else {
//     console.log("No additional arguments provided by the user.");
// }
import fs from "fs"
import path from "path"
const TASKS_FILE = path.join(process.cwd(), "tasks.json")

function loadTask(){
    try {
        if(!fs.existsSync(TASKS_FILE)){
            fs.writeFileSync(TASKS_FILE, "[]", "utf-8")
            return []
        }
    
        const fileContent = fs.readFileSync(TASKS_FILE, "utf-8")
        if(fileContent.trim() === ""){
            return []
        }
        return JSON.parse(fileContent)
    } catch (error) {
        console.error(`Error loading tasks from ${TASKS_FILE}:`, error.message);
        process.exit(1)
    }
}

function saveTasks(tasks){
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8")
    } catch (error) {
        console.error(`Error saving tasks to ${TASKS_FILE}:`, error.message);
        process.exit(1); // Exit if unable to save tasks
    }
}
let tasks = loadTask()

const args = process.argv.slice(2) // now we can only get the user provided arguments with "args"

if(args.length === 0){
    console.log("Welcome to Task Tracker CLI!");
    console.log("Usage: node task-cli <command> [arguments...]");
    console.log(
        "Commands: add, list, update, delete, mark-in-progress, mark-done"
    );
    process.exit(0); // Exit gracefully
}

const command = args[0];

switch (command) {
    case "add":
        const description = args[1]
        if(!description){
            console.error("Error: Add command requires a description.");
            console.log('Usage: node task-cli add "Your task description"');
            process.exit(1); // Exit with an error code
        }
        const newId =
            tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
        const now = new Date().toISOString(); // ISO 8601 format
        tasks.push({
            id: newId,
            description: description,
            status: "todo",
            createdAt: now,
            updatedAt: now,
        });
        saveTasks(tasks)
        console.log(`Adding task : ${description}`)
        break
    case "list":
        const filter = args[1]
        if(filter){
            console.log(`Listing tasks with filter ${filter}`)
        }else{
            if(tasks.length <= 0){
                console.log("No Tasks in To-Do to show")
                break
            }
            tasks.forEach(task => {
                console.log(`task successfull seen `)
            });
            console.log(`Listing All Tasks`);
        }
        break
    case "update":
        const toBeUpdateId = parseInt(args[1])
        const newDescription = args[2]
        if(isNaN(toBeUpdateId) || !newDescription){
            console.error(
                "Error: Update command requires a valid ID and a new description."
            );
            console.log('Usage: node task-cli update <ID> "New description"');
            process.exit(1); //exit with error code
        }
        //find entry with the toBeUpdatedId and change description
        console.log(`Updating Task with id ${toBeUpdateId} to: "${newDescription}"`)
        break
    case "delete":
        const toBeDeletedId = parseInt(args[1]);
        if(isNaN(toBeDeletedId)){
            console.error(
                "Error: Delete command requires a valid ID and a new description."
            );
            console.log('Usage: node task-cli delete <ID> ');
            process.exit(1); //exit with error code
        }
        // find the toBeDeletedId and delete the whole entry
        console.log(
            `Deleting Task with id ${toBeDeletedId}`
        );
        break
    case "mark-in-progress":
        const toBeUpdatedStatusId = args[1]
        if(isNaN(toBeUpdatedStatusId)){
            console.error(
                "Error: Mark in progress command requires a valid ID and a new description."
            );
            console.log("Usage: node task-cli mark-in-progress <ID> ");
            process.exit(1); //exit with error code
        }
        //find the Entry tobeUpdatedStatusId and update the status 
        console.log(`Updating status to Mark in progress with task id ${toBeUpdatedStatusId}`)
        break
    case "mark-done":
        const toBeMarkDoneStatusId = args[1]
        if (isNaN(toBeMarkDoneStatusId)) {
            console.error(
                "Error: Mark Done command requires a valid ID and a new description."
            );
            console.log("Usage: node task-cli mark-done <ID> ");
            process.exit(1); //exit with error code
        }
        //find the Entry tobeUpdatedStatusId and update the status 
        console.log(
            `Updating status to Mark Done with task id ${toBeMarkDoneStatusId}`
        );
        break
    
    default:
        console.error(`Error: Unknown command "${command}"`);
        console.log('Please use one of: add, list, update, delete, mark-in-progress, mark-done');
        process.exit(1);
}