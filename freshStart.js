import { promises as fsP } from "node:fs";
import path from "node:path";

const fileName = "newTasks.json";
const filePath = path.join(process.cwd(), fileName);
// console.log(process.argv)
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
const prompts = process.argv.slice(2);
console.log(prompts);

const loadTodo = async function () {
    try {
        const data = await fsP.readFile(filePath, "utf-8"); // read the file , if it exists , and consolelog it
        return JSON.parse(data);
    } catch (error) {
        console.log("Error in loadTodo");
        if (error.code === "ENOENT") {
            // the file doesnt exist , so create it async-way
            await fsP.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
            console.log("Created new task file");
            return []
        } else {
            console.error("Error accessing file: ", error);
            return []
        }
    }
};

async function getIncrementedIds(todos) {
    if (!todos || todos.length === 0) return 1;
    const validId = todos.map((todo) => Number(todo.id)).filter(id => !isNaN(id) && id > 0)
    if(validId.length === 0) return 1
    return Math.max(...validId) + 1;
}

const addTodo = async function (myTodo) {
    let todos;
    try {
        // await fsP.access(filePath, fsP.constants.F_OK);
        // check weather the file exist for access
        try {
            todos = await loadTodo(); // get the todos
            console.log(myTodo);
            console.log(todos);
            console.log("Add todo entered and got the data");
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
        }
        const newTodo = {
            id: await getIncrementedIds(todos),
            task: myTodo,
            createdAt: new Date().toISOString(),
        };

        todos.push(newTodo);

        await fsP.writeFile(filePath, JSON.stringify(todos), "utf-8");
        console.log(
            "todo finally added , and this is how new updated would look ",
            todos
        );
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};

const listTodo = async function () {
    const data = await loadTodo();
    return console.log(data);
};

const updateTodo = async function (todoId, givenTodo) {
    try {
        const data = await loadTodo()
        let updated = false
        data.forEach((todo)=> {
            if(todo.id === Number(todoId)){
                todo.task = String(givenTodo);
                updated = true;
            }
        })
        if (!updated) {
            console.log("No todo found with that id.");
            return;
        }
        console.log("Todo updated !!!");
        await fsP.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
        console.log("Todo updated! New list:", data);
    } catch (error) {
        console.error("Error updating todo:", error);
    }

}

const deleteTodo = async function (todoId) {
    try {
        const data = await loadTodo();
        const filtered = data.filter(todo => todo.id !== Number(todoId))
        if(data.length === filtered.length){
            console.log("No todo found with the same id to be deleted")
        }
        await fsP.writeFile(filePath, JSON.stringify(filtered, null , 2), "utf-8" )
        console.log("Todo deleted !!!")
        console.log(
            `Updated todos after deleting one is pushed , New list of todos : ${JSON.stringify(
                filtered,
                null,
                2
            )}`
        );
    } catch (error) {
        console.error("Error deleting todo:", error);
    }

}

if (prompts && prompts[0].toLowerCase() === "add") {
    console.log("You have choosen the add option of todo");
    addTodo(prompts[1]);
}
if (prompts && prompts[0].toLowerCase() === "update") {
    console.log("You have choosen the update option of todo");
    updateTodo(prompts[1], prompts[2])
}
if (prompts && prompts[0].toLowerCase() === "delete") {
    console.log("You have choosen the delete option of todo");
    deleteTodo(prompts[1])
}
if (prompts && prompts[0].toLowerCase() === "list") {
    console.log("You have choosen the list option of todo");
    listTodo();
}
// loadTodo()
