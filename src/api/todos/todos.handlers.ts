import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { nextTick } from "process";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { Todo, TodoWithId, Todos } from "./todos.model";

export async function createOne(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const insertResult = await Todos.insertOne(req.body);
        if (!insertResult.acknowledged) {
            throw new Error('somthing wrong to insert')
        }
        res.status(201).json({
            _id: insertResult.insertedId,
            ...req.body
        })
    } catch (error) {
        next(error);
    }
}

export async function findAll(req: Request, res: Response<Todo[]>, next: NextFunction) {
    try {
        const todos = await Todos.find().toArray();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOne({
            _id: new ObjectId(req.params.id)
        })
        if (!result) {
            throw new Error(`Todo with ${req.params.id} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}

export async function update(req: Request<ParamsWithId, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOneAndUpdate({
            _id: new ObjectId(req.params.id)
        }, {
            $set: req.body
        }, {
            returnDocument: 'after'
        });

        if (!result.value) {
            throw new Error(`Todo with ${req.params.id} not found`);
        }
        res.json(result.value);
    } catch (error) {
        next(error);
    }
}

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const result = await Todos.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (!result) {
            res.status(404);
            throw new Error(`Todo with id ${req.params.id} not found`);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

