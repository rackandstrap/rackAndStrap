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
        let queries = {}
        const leaveDate = req.query.leaveDate.split(',');
     
        
       

        for (let prop in req.query) {
            switch (prop) {
                case 'from.city': 
                    queries['from.city'] = req.query[prop].toLowerCase()
                    break
                case 'from.state': 
                    queries['from.state'] = req.query[prop].toLowerCase()
                    break
                case 'destination.city': 
                    queries['destination.city'] = req.query[prop].toLowerCase()
                    break
                case 'destination.state': 
                    queries['destination.state'] = req.query[prop].toLowerCase()
                    break
                case 'leaveDate':
                    const leaveDate = req.query.leaveDate.split(',');
                    queries.leaveDate = {
                        $gte: leaveDate[0],
                        $lte: leaveDate[1]
                    }
                    break
                case 'arrivalDate':
                    const arrivalDate = req.query.arrivalDate.split(',');
                    queries.arrivalDate = {
                        $gte: arrivalDate[0],
                        $lte: arrivalDate[1]
                    }
                    break
            }
        }


        const job = await Jobs.find(queries).limit(parseInt(req.query.limit) || 10).populate('postedBy')
        res.json(job)
    } 
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

const addJob = asyncHandler(async (req, res) => {
    try {
        const job = req.body
        const user = req.user
        job.postedBy = user.id
        const createdJob = await Jobs.create(job)
        user.jobs.push(createdJob._id)
        user.save()
        res.status(201).json({job: createdJob, user: user})
    } 
    catch (err) {
        res.status(400).send('something went wrong')
    }
})

const editJob = asyncHandler(async (req, res) => {
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(req.params.jobId, req.body, {new: true})
        res.json(updatedJob)
    } 
    catch (err) {
        res.status(400).send(err.message)
    }
})

const deleteJob = asyncHandler(async (req, res) => {
    const user = req.user
    const jobId = req.params.jobId
    if (!user.jobs.includes(jobId)) {
        res.status(404).json({response: 'Job not found'});
    } else {
        const deletedJob = await Jobs.findByIdAndDelete(jobId)
        if (deletedJob) {
            user.jobs.remove(jobId)
            user.save()
            res.json({deletedJob: deletedJob, user: user})
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