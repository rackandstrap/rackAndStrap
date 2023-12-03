import React from "react";
import { useState } from "react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

const Home = () => {

    // Handle selecting between service and request jobs
    const[focus, setFocus] = useState("Request");
    // console.log(focus)
    const handleRadio=(e)=>{
        // console.log(e.target.value)
        setFocus(e.target.value)
    }

    const API_BASE_URL = process.env.REACT_APP_BASE_URL

    const[allJobs, setAllJobs] = useState([])

    const stateTable = {AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO:"Colorado", CT:"Connecticut", DE:"Delaware", DC:"Washington DC", FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana", IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Michigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Navada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina", ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dekota", TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia", WA:"Washington", WV:"West Virgina", WI:"Wisconsin", WY:"Wyoming"}

    const getJobs = useQuery({
        // queryKey: ['posts'],
        queryFn: async () => {
          const response = await axios.get(API_BASE_URL + 'jobs/?limit=50');
          const data = await response.data;
        //   This is a list object
          console.log(data)
          return data
        },
        onSuccess: (data) => {
            console.log(data)
            setAllJobs(data)

        }
    })

    var displayRequest = [];
    var displayService = [];

    if (allJobs.length > 0){
        // Replace this with reduce operator
        displayRequest = allJobs.reduce((myList, item)=>{
            if (item.type === "request"){
                myList.push(item);
            }
            return myList
        },[])

        displayService = allJobs.reduce((myList, item)=>{
            if (item.type === "service"){
                myList.push(item);
            }
            return myList
        },[])

        // for (const i of allJobs){
        //     if(i.type == "request"){
        //         if(displayRequest.length < 100){
        //             displayRequest.push(i)
        //         }
        //     } else {
        //         if(displayService.length < 100){
        //             displayService.push(i)
        //         }
        //     }
        // }
    }

    const handleOpen=()=>{

    }
    if(focus === "Request"){
        return (
            <div>
                <h1>Home</h1>
                {/* Do toggle between jobs and request */}
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={focus}
                    onChange={handleRadio}
                    >
                    <FormControlLabel value="Request" control={<Radio />} label="Request" />
                    <FormControlLabel value="Service" control={<Radio />} label="Service" />
                    </RadioGroup>
                </FormControl>
    
                <div>
                <div className="table">
                        <p>Title</p>
                        <p>Bid/Offer</p>
                        <p>From:</p>
                        <p>To:</p>
                    </div>
                    {getJobs.isFetching ? (
                        // Display a loading icon when data is being fetched
                        <div className="loading-icon">Loading...</div>
                    ) : (
                        // Display job request data when available
                        displayRequest.map((item) => (
                            <div className='jobCard' onClick={()=>handleOpen()}>
                                <p key={uuidv4()}>{item.title}</p>
                                <p>{item.bid}</p>
                                <p>{stateTable[item.from.state]}</p>
                                <p>{stateTable[item.destination.state]}</p>
                                {/* <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                                <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button > */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Home</h1>
                {/* Do toggle between jobs and request */}
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={focus}
                    onChange={handleRadio}
                    >
                    <FormControlLabel value="Request" control={<Radio />} label="Request" />
                    <FormControlLabel value="Service" control={<Radio />} label="Service" />
                    </RadioGroup>
                </FormControl>
    
                <div>
                <div className="table">
                        <p>Title</p>
                        <p>Bid/Offer</p>
                        <p>From:</p>
                        <p>To:</p>
                    </div>
                    {getJobs.isFetching ? (
                        // Display a loading icon when data is being fetched
                        <div className="loading-icon">Loading...</div>
                    ) : (
                        // Display job request data when available
                        displayService.map((item) => (
                            <div className='jobCard' onClick={()=>handleOpen()}>
                                <p key={uuidv4()}>{item.title}</p>
                                <p>{item.bid}</p>
                                <p>{stateTable[item.from.state]}</p>
                                <p>{stateTable[item.destination.state]}</p>
                                {/* <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                                <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button > */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Home</h1>
            {/* Do toggle between jobs and request */}
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={focus}
                onChange={handleRadio}
                >
                <FormControlLabel value="Request" control={<Radio />} label="Request" />
                <FormControlLabel value="Service" control={<Radio />} label="Service" />
                </RadioGroup>
            </FormControl>

            <div>
            <div className="table">
                    <p>Title</p>
                    <p>Bid/Offer</p>
                    <p>From:</p>
                    <p>To:</p>
                </div>
                {getJobs.isFetching ? (
                    // Display a loading icon when data is being fetched
                    <div className="loading-icon">Loading...</div>
                ) : (
                    // Display job request data when available
                    displayRequest.map((item) => (
                        <div className='jobCard' onClick={()=>handleOpen()}>
                            <p key={uuidv4()}>{item.title}</p>
                            <p>{item.bid}</p>
                            <p>{stateTable[item.from.state]}</p>
                            <p>{stateTable[item.destination.state]}</p>
                            {/* <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                            <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button > */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;