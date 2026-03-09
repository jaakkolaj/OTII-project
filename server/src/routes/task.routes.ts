import { Router } from "express";
import { getTasks, createTask, deleteTask } from "../controllers/task.controller";
import { authentication } from "../middleware/authentication";

const taskRouter = Router();

// Hakee kaikki käyttäjän taskit
taskRouter.get('/', authentication, getTasks);

// Luo uuden taskin
taskRouter.post('/', authentication, createTask);

// Poistaa olemassa olevan taskin
taskRouter.delete('/:id', authentication, deleteTask);

export default taskRouter;