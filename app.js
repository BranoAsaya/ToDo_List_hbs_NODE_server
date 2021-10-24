const fs = require("fs");
const file = "todo.json";
const express = require("express");
const app = express();
const PORT = 8080;
const ex_hbs = require("express-handlebars");

let todoTrue =[];
let todoFalse =[];

try {
    let tasksJson = fs.readFileSync(file,'utf8')
    let tasksObj = JSON.parse(tasksJson)

 todoTrue =tasksObj.filter(arg =>{ return arg.status === true})
 todoFalse =tasksObj.filter(arg =>{ return arg.status === false})

   
} catch (err) {
    console.error(err);
}

app.set("view engine", "hbs");
app.engine(
  "hbs",
  ex_hbs({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.use(express.static('public'))
app.get("/", (req, res) => {

    res.render("content", {
      title: "Home",
      secOne:todoTrue,
      secTwo:todoFalse,
      text:'ff'


    });
    
  });
 

app.listen(PORT)