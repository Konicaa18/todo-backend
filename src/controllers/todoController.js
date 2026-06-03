const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
    const todos = await Todo.find({
    user: req.user.userId
    });
    res.json(todos);
};
const createTodo = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const todo = await Todo.create({
        title: req.body.title,
        user: req.user.userId
    });

    res.status(201).json(todo);
};

const getTodoById = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.user.toString() !== req.user.userId) {
        return res.status(403).json({
            message: "Not authorized"
        });
    }

    res.json(todo);
};
const updateTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.user.toString() !== req.user.userId) {
        return res.status(403).json({
            message: "Not authorized"
        });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            completed: req.body.completed
        },
        {
            new: true
        }
    );

    res.json(updatedTodo);
};

const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }
    if (todo.user.toString() !== req.user.userId) {
    return res.status(403).json({
        message: "Not authorized"
    });
    }
    await Todo.findByIdAndDelete(req.params.id);
    res.json({
        message: "Todo deleted successfully"
    });
};
module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
};