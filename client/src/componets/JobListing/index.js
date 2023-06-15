import React from "react";
import { useState, useEffect } from "react";
const axios = require('axios')

const JobListing = () => {

    /*
        Simple load the jobs on to the page
        This should top most recent 30 jobs
        If the user logged in, this we should
        load the jobs that is most closely to them. 
    */
    const[jobs, setJobs] = useState([]);

    //http://localhost:3001/jobs/

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3001/jobs/');
              // Handle the API response
              console.log(response.data);

              setJobs(response.data);

            } catch (error) {
              // Handle the error
              console.error(error);
            }
        };

        fetchData();

    },[]);

    const jobsJsx = jobs.map((item)=>{
        <div key={item._id}>
                <p>ID: {item._id}</p>
                <p>Name: {item.postedBy.username}</p>
                <p>Type: {item.type}</p>
                {/* Ref to jobs details */}
                </div>
    })

    return (
        <div>
            <h1>JobListing</h1>
            {jobs.map((item) => (
                <div key={item._id}>
                <p>ID: {item._id}</p>
                <p>Name: {item.postedBy.username}</p>
                <p>Type: {item.type}</p>
                {/* Ref to jobs details */}
                </div>
            ))}
        </div>
    );
}

export default JobListing;