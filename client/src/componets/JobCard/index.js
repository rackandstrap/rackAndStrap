import React from "react";


const JobCard = ({job}) => {

    console.log(job)
    return (
        <div className="card-container">
            <div>{job.postedBy.username}</div>
            <p>{job.description}</p>
            <h1>{job.title}</h1>

            <section className="location">
                <div className="origin">
                    {job.from.city},
                    {job.from.state}
                </div>
                <div className="destination">
                    {job.destination.city},
                    {job.destination.state}
                </div>
            </section>
            <div>{job.status}</div>
        </div>
    );
}

export default JobCard;