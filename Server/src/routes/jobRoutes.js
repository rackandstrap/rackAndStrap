const router = require('express').Router();
const Jobs = require('../models/jobModel');
const {getJob, getAllJobs, addJob, editJob, deleteJob} = require('./controllers/jobController');

router.get('/:num', getAllJobs)

router.get('/', getJob)

router.post('/', addJob)

router.patch('/', editJob)

router.delete('/', deleteJob)