const Jobs = require('../models/jobModel');
const asyncHandler= require('express-async-handler')


const getJob = asyncHandler(async (req, res) => {

})

const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await jobs.find().limit(req.params.num)
        res.json(jobs)
    } 
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

const addJob = asyncHandler(async (req, res) => {
    const job = req.body
    job.createdBy = req.userId
    const createdJob = await Jobs.create(job)
    res.status(201).json({job: createdJob})
})

const editJob = asyncHandler(async (req, res) => {

})

const deleteJob = asyncHandler(async (req, res) => {

})


module.exports = {
    getJob,
    getAllJobs,
    addJob,
    editJob,
    deleteJob
}