const express = require('express');
const { getUserTasks } = require('../controllers/task.controller');

const router = express.Router();

router.get('/asana/getUserTasks', async (_, res) => {
  try {
    const tasks = await getUserTasks();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching user tasks:", error.message, error);
    res.status(500).json({ message: 'Failed to fetch user tasks' });
  }
});

module.exports = router;
