const router = require('express').Router();
const { authenticateUser } = require('../middleware');
const {getJob, getJobs, addJob, editJob, deleteJob} = require('../controllers/jobController');


router.get('/:num', getJobs)

router.get('/:jobId', getJob)

router.post('/', authenticateUser, addJob)

// router.patch('/', editJob)

router.delete('/:jobId', authenticateUser, deleteJob)

module.exports = router