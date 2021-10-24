const p = require("process");
const fs = require("fs");
const file = "todo.json";
const cmd = p.argv[2];
const id = Number(p.argv[3]);
const name = p.argv[4];
const date = p.argv[5];
let status = p.argv[6];



if (p.argv[2] === undefined || p.argv[3] === undefined) {
  console.error("wrong input//id must be number");
  return;
}
if (status === "true") {
    status = () => {return true;}

  } else if (status === "false") {
    status = () => {return false;}

  } else {
     console.error("unknown status");
  }

let todoList;

try {
  let todoJson = fs.readFileSync(file, "utf8");
  todoList = JSON.parse(todoJson);
} catch (err) {
  todoList = [];
}
let task;

try { task = { id, name, date, status : status() };
     
} catch (err) {
     task = { id, name, date, status };

}



switch (cmd) {
  case "add":
      
    function createTask() {
     
      if (p.argv[6] !== undefined || p.argv[3] === Number) {
        try {
          if (todoList === []) {
            todoList.push(task);
            throw "new array";
          } else if (todoList.find((arg) => arg.id === Number(p.argv[3]))) {
            throw "Task already in todo";
          } else {
            todoList.push(task);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error(" wrong");
      }
    }
    createTask();
    break;
  case "read list":
    function readTask() {
      console.log(JSON.stringify(todoList));
    }
    readTask();
    break;
  case "update":
    function updateTask() {

      try {
        if (todoList === []) {
          throw "todo list is empty";
        } else if (todoList.find((arg) => arg.id === task.id)) {
          index = todoList.findIndex((arg) => arg.id === task.id);
          todoList[index].name = name;
          todoList[index].date = date;
          todoList[index].status = status();

          fs.writeFileSync(file, JSON.stringify(todoList));
        }
      } catch (err) {
        console.error(err);
      }
    }
    updateTask();

    break;
  case "delete":
    function deleteTask() {
      try {
        if (todoList === []) {
          throw "empty todo list";
        } else if (todoList.find((arg) => arg.id === task.id)) {
          index = todoList.findIndex((arg) => arg.id === task.id);
          todoList.splice(index, 1);
          fs.writeFileSync(file, JSON.stringify(todoList));
        }
      } catch (err) {
        console.error(err);
      }
    }
    deleteTask();
    break;
  default:
    console.error("wrong command");
    break;
}

todoJson = JSON.stringify(todoList);
fs.writeFileSync(file, todoJson);
console.log(todoList);
