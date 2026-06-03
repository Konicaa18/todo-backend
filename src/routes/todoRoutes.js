const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

const router = express.Router();
router.get("/", protect, getTodos);

router.get("/:id", protect, getTodoById);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;