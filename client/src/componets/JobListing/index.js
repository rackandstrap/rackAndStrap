import React from "react";
import axios from "axios";
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


    let JSXJobListing = jobListings.map((job) => {
        return <JobCard job={job} />
    })


    return (
        <div>
            <section className="jobs-post">
                {JSXJobListing}
            </section>
        </div>
    );
}

export default JobListing;