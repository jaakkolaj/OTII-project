import { Request, Response } from "express";
import prisma from "../prisma";

export const getTasks = async (req: Request, res: Response) => {
    if(!req.user) {
        return res.status(401).json({ "error": "Unauhtorized" });
    }

    try {
        const tasks = await prisma.task.findMany({ where: { user_id: req.user.id } });
        return res.status(200).json(tasks);
    } catch(error) {
        return res.status(500).json({ "Error": "Internal server error" });
    }
};

export const createTask = async (req: Request, res: Response) => {
    if(!req.user) {
        return res.status(401).json({ "error": "Unauhtorized" });
    }

    try {
        const { task } = req.body;
        const newTask = await prisma.task.create({
            data: {
                task_text: task,
                user_id: req.user.id
            }
        });
        res.status(200).json(newTask);
    } catch(error) {
        return res.status(500).json({ "Error": "Internal server error" });
    }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response) => {
    if(!req.user) {
        return res.status(401).json({ "error": "Unauhtorized" });
    }

    try {
        await prisma.task.delete({ where: { id: req.params.id } });
        return res.status(200).send();
    } catch(error) {
        return res.status(500).json({ "Error": "Internal server error" });
    }
};