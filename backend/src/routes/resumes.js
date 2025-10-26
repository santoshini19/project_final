const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');

router.post('/', controller.createResume);
router.get('/', controller.getResumes);
router.get('/:id', controller.getResumeById);
router.put('/:id', controller.updateResume);
router.delete('/:id', controller.deleteResume);

module.exports = router;