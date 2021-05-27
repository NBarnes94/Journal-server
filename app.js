require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
// app.use('/test', (req, res)=>{
//     res.send('This is a message from the test endpoint on the server!')
// })
app.use(Express.json());

const controllers = require("./controllers");
// const router = require('./controllers/journalcontroller');
app.use("/journal", controllers.journalController);
app.use("/user", controllers.userController);
// app.use(require("./middleware/validate-jwt")); //! since we want all users to have access to we need to do that in the journal controller 

// router.get('/about', (req, res)=>{
//     res.send('This is the about route')
// })

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() =>{
        app.listen(3000, () =>{
            console.log(`[Server]: App is listening on 3000`);
        });
    })
    .catch((err) =>{
        console.log(`[Sever]: Server crashed. Error = ${err}`);
    });