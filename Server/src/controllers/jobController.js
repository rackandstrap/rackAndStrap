const Jobs = require('../models/jobModel');
const asyncHandler= require('express-async-handler')


const getJob = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId
    const job = await Jobs.findById(jobId).populate('postedBy')
    if (job) {
        res.json(job)
    } else {
        res.status(404).send('Job not found');
    }
})

const getJobs = asyncHandler(async (req, res) => {
    try {
        const job = await Jobs.find().limit(parseInt(req.query.limit)).populate('postedBy')
        res.json(job)
    } 
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

const addJob = asyncHandler(async (req, res) => {
    const job = req.body
    job.postedBy = req.user.id
    const createdJob = await Jobs.create(job)
    const user = req.user
    user.jobs.push(createdJob._id)
    user.save()
    res.status(201).json({job: createdJob, user: user})
})

const editJob = asyncHandler(async (req, res) => {
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(req.params.jobId, req.body, {new: true})
        res.json(updatedJob)
    } 
    catch (err) {
        res.status(500).send('server error')
    }
})

const deleteJob = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId
    if (!jobId in req.user.jobs) {
        res.status(404).json({response: 'Job not found'});
    } else {
        const deletedJob = await Jobs.findByIdAndDelete(req.user.id)
        if (deletedJob) {
            res.json(deletedJob)
        } else {
            res.status(404).json({response: 'Job not found'});
        }
    }
})

module.exports = {
    getJob,
    getJobs,
    addJob,
    editJob,
    deleteJob
}