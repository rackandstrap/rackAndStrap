import React from "react";
import JobListing from "../../componets/JobListing"
import Navigate from "../Navigate/index.js"

const landingPage = () => {

    return (
        <div>
            <h1>This is a landing page</h1>
            <Navigate/>
            <JobListing/>
        </div>
    );
}

export default landingPage;