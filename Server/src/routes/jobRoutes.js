const router = require('express').Router();
const { authenticateUser } = require('../middleware');
const {getJob, getJobs, addJob, editJob, deleteJob} = require('../controllers/jobController');

// GET /jobs/?limit=<num>
router.get('/', getJobs)

// GET /jobs/<jobId>
router.get('/:jobId', getJob)

// POST /jobs/<jobId>
// send all the reqired fields for the jobs schema in the request body
router.post('/', authenticateUser, addJob)

// PATCH /jobs/<jobId>
// send an object with the properties you want to update in the request body
// send the token in the request headers -> Authorization: 'Bearer <token>'
router.patch('/:jobId', authenticateUser, editJob)

// DELETE /jobs/<jobId>
// send the token in the request headers -> Authorization: 'Bearer <token>'
router.delete('/:jobId', authenticateUser, deleteJob)


module.exports = router
