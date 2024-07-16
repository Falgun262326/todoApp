const express = require('express');
const router = express.Router();

const User = require('../models/user');
const List = require('../models/list');

//CREATE
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);

        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();

            existingUser.list.push(list);
            await existingUser.save();
            res.status(200).json({ list });
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Log in First', error });
    }
});

//UPDATE
router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        if (list) {
            res.status(200).json({ message: "Task Updated", list });
        } else {
            res.status(404).json({ message: 'Task Not Found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Log in First', error });
    }
});

//DELETE
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const list = await List.findByIdAndDelete(taskId);
        if (list) {
            await User.updateOne(
                { _id: list.user },
                { $pull: { list: taskId } }
            );
            res.status(200).json({ message: "Task Deleted" });
        } else {
            res.status(404).json({ message: "Task Not Found" });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error Deleting Task', error });
    }
});

//GET TASKS
router.get('/getTask/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: 1 });
        if (list.length !== 0) {
            res.status(200).json(list);
        } else {
            res.status(200).json({ message: 'No Tasks Created' });
        }
    } catch (error) {
        res.status(400).json({ message: 'List is Empty', error });
    }
});

module.exports = router;
