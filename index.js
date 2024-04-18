#! /user/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
async function main() {
    while (condition) {
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What do you want to do?",
            choices: ["Add", "View", "Update", "Delete", "Exit"]
        });
        switch (choice.action) {
            case "Add":
                await addTodo();
                break;
            case "View":
                viewTodos();
                break;
            case "Update":
                await updateTodo();
                break;
            case "Delete":
                await deleteTodo();
                break;
            case "Exit":
                condition = false;
                console.log("Exiting...");
                break;
        }
    }
}
async function addTodo() {
    const { todo, addmore } = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add to your todos?"
        },
        {
            name: "addmore",
            type: "confirm",
            message: "Do you want to add more?",
            default: false
        }
    ]);
    todos.push(todo);
    if (addmore) {
        await addTodo();
    }
}
function viewTodos() {
    console.log("Your Todo List:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
}
async function updateTodo() {
    const { index } = await inquirer.prompt({
        name: "index",
        type: "input",
        message: "Enter the index of the task you want to update:"
    });
    const { updatedTodo } = await inquirer.prompt({
        name: "updatedTodo",
        type: "input",
        message: "Enter the updated task:"
    });
    todos[Number(index) - 1] = updatedTodo;
    console.log("Task updated successfully!");
}
async function deleteTodo() {
    const { index } = await inquirer.prompt({
        name: "index",
        type: "input",
        message: "Enter the index of the task you want to delete:"
    });
    todos.splice(Number(index) - 1, 1);
    console.log("Task deleted successfully!");
}
main();
