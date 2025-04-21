
const express = require('express');
const { getUserTasks } = require('../controllers/taskController');
const router = express.Router();

router.get('/getUserTasks', async(_,res) =>{
    console.log('HEllo');
    const result = await getUserTasks();
    res.status(200).json(result);
});

module.exports = router;

