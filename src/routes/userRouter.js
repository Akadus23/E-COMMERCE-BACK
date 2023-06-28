const {Router} = require('express');
const  { getUsers, createUser } = require('../controllers/getUsers');
const userRouter = Router();

userRouter.get("/user", getUsers),
userRouter.post("/user", createUser)

module.exports = userRouter;