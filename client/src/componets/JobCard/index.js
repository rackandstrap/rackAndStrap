import React from "react";
import  { GiCanoe, GiPaddles, GiSailboat, GiDutchBike } from "react-icons/gi"
import { useState } from "react";
import "./index.css"


const JobCard = ({ job }) => {
    
    let itemsFromJob = [];

   for (let item in job.items) {
    if(item === "bike" || "canoo" || "boat" || "jetski") {
        itemsFromJob.push(item)
    }
   }

   let itemJSX = itemsFromJob.map((item) => {
    if (item === "bike") {
        return  <GiDutchBike size={50} style={{backgroundColor: "lightGreen"}}/>
    } else if (item === "canoo") {
        return  <GiCanoe size={50} width={245} style={{backgroundColor: "lightGreen"}}/>
    } else if (item === "boat") {
        return <GiSailboat size={50} style={{backgroundColor: "lightGreen"}}/>
    } else {
        return <GiPaddles size={50} style={{backgroundColor: "lightGreen"}}/>
    }
   }) 

    return (
        <div className="card-container">
            <div className="created-by-user">{job.postedBy.username}</div>
            <div className="icon-for-equipment">
                {/* {job.description} */}
                {itemJSX}
            </div>
            <p>{job.title}</p>
            <section className="location">
                <div className="origin">
                    {job.from.city},
                    {job.from.state}
                </div>
                <div className="destination">
                    {job.destination.city},
                    {job.destination.state}
                    {job.destination.items}
                </div>
            </section>
            <div>{job.type}</div>
        </div>
    );
}

export default JobCard;