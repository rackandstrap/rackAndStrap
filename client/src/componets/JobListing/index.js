import React from "react";
import axios from "axios";
import "./index.css"
import { useState, useEffect } from "react";

import JobCard from "../JobCard";

const JobListing = () => {
    const [jobListings, setJobListings] = useState([])

    useEffect(() => {
        const getJobsData = async () => {
          const res = await axios('http://localhost:3001/jobs');
          setJobListings(res.data);
      }
      getJobsData()
    }, []);

    console.log(jobListings);

    let JSXJobListing = jobListings.map((job) => {
        return <JobCard key={job._id} job={job} />
    })


    return (
        <div>
            <section className="job-posts">
                {JSXJobListing}
            </section>
        </div>
    );
}

export default JobListing;