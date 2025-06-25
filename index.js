// import the readline module for work with stdin, or stdout.
const readline = require("readline");
const fs = require("node:fs");
const path = require("node:path");
const tasksFile = path.join(__dirname, "tasks.json");
let tasks = [];

function displayMenu() {
    console.log("\n Choose a action");
    console.log("1. create a Todo");
    console.log("2. update a todo");
    console.log("3. read a todo");
    console.log("4. delete a todo");
    console.log("5. exit");
}

function loadTasks() {
    try {
        if (fs.existsSync(tasksFile)) {
            const data = fs.readFileSync(tasksFile, "utf-8");
            tasks = JSON.parse(data);
        } else {
            fs.writeFileSync(tasksFile, JSON.stringify([]), "utf-8");
            tasks = [];
            console.log("File just created");
        }
    } catch (error) {
        console.log("Error loading tasks: ", error);
        tasks = [];
    }
}

function listTasks() {
    if (tasks.length <= 0) {
        console.log("NO tasks to show");
        displayMenu();
        return;
    }
    console.log("\n--- Tasks ---");
    tasks.forEach((task) => {
        console.log(`${task.id}: ${status} ${task.description}`);
    });
    console.log("--------- \n");
}
function saveTask() {
    try {
        if (fs.existsSync(tasksFile)) {
            fs.writeFileSync(
                tasksFile,
                JSON.stringify(tasks, null, 2),
                "utf-8"
            );
        }
    } catch (error) {
        console.log("Error while saving tasks: ", error);
    }
}
function addTask(description) {
    const newTask = { id: Date.now(), description, completed: false };
    tasks.push(newTask);
    saveTask();
    console.log(`Task ${description} added`);
}
// create a readline object to work with the stream.
// pass the stdin, or stdout in the current process.
const prompts = readline.createInterface(process.stdin, process.stdout);
function crudCLI() {
    displayMenu();
    prompts.question("Enter your choice: ", (choice) => {
        if (choice === "1") {
            console.log("You have choosen create to a TODO");
            prompts.question("What Task you want to create? ", (response) => {
                if (response) {
                    console.log(`${response} is recorded :)`);
                    addTask(response);
                    crudCLI();
                }
            });
        }
        if (choice === "2") {
            console.log("You have choosen update to a TODO");
            prompts.question("What Task you want to update? ", (taskId) => {
                tasks.filter(([id, task]) => {
                    id === parseInt(taskId)
                        ? (tasks[taskId] = task)
                        : console.log("we couldnt find it");
                });
            });
            crudCLI();
        }
        if (choice === "3") {
            console.log("You have choosen read to a TODO");
            listTasks()
            crudCLI();
        }
        if (choice === "4") {
            console.log("You have choosen delete to a TODO");
            crudCLI();
        }
        if (choice === "5") {
            console.log("You have choosen exit");
            prompts.close();
            // crudCLI();
        }
    });
}

crudCLI();
// console.log(tasks);
