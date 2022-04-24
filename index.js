const express = require('express');
const cors= require('cors');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

// const userDao = require("./dao/userdao")

const app = express();
const port = process.env.PORT || 4000;
const ddCharactersRouter = require("./routes/character");

app.use(express.json());
app.use(cors())


app.use(bodyparser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });


// link up router the the route
app.use("/ddcharacters", ddCharactersRouter);
/* Error handler middleware */

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });







// const routes = require('../../server/routes/character');
// app.use('/', routes);




// app.use(express.json())

// app.get('/users', async (req, res) => {
//     try {
//         const users = await userDao.getAllUsers(); 
//         res.send(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("An Error occured processing your request");
//     }
// })

// app.get("/user/:id", async (req, res) => {
//     try {
//         const user = await userDao.getById(req.params.id);
//         res.send(user)
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("An Error occured processing your request");
//     }
// })

  
// app.listen(PORT, (error) =>{
//     if(!error)
//         console.log("Server is Successfully Running, and App is listening on port "+ PORT)
//     else 
//         console.log("Error occured, server can't start", error);
//     }
// )