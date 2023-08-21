import React from "react";
import kayakImg from "../../pages/assests/landing_image.jpg"
import "./LandingPage.css"
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { formControlClasses } from "@mui/material";
import {useNavigate} from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const LandingPage = () => {

    const navigate = useNavigate()

    //Check for token, if we have a token we push the user to the
    //Log in user and send them to home

    
    
    // Get the latest 20 jobs, then filter by request/provides
    // Then display 5 requests and 5 provides by title, offer, from and two.
    // Clickable pop up to login to see more

    const API_BASE_URL = process.env.REACT_APP_BASE_URL

    const[allJobs, setAllJobs] = useState([])

    const stateTable = {AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO:"Colorado", CT:"Connecticut", DE:"Delaware", DC:"Washington DC", FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana", IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Michigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Navada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina", ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dekota", TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia", WA:"Washington", WV:"West Virgina", WI:"Wisconsin", WY:"Wyoming"}

    //Pop up to push user to login
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    var displayRequest = []
    var displayService = []

    if (allJobs.length > 0){
        for (const i of allJobs){
            if(i.type == "request"){
                if(displayRequest.length < 5){
                    displayRequest.push(i)
                }
            } else {
                if(displayService.length < 5){
                    displayService.push(i)
                }
            }
        }
    }

    const goToLogin=()=>{
        navigate('/login');
    }

    return (
        <div className="landing-page-content-container">
            <section className="left-landign-page">
                <h1  className="logo" >Rack & Strap</h1>
                <h4> Moving Kayaks, With Stoked Folks</h4>
                <img src={kayakImg} alt="ima" />
            </section>
            
            {/* Lets make two different sections for sample data. Need Help & Got Space */}
            <section className="right-landing-page">
                <h2>Need Help!</h2>
                {/* Display 5 Latest Job Request here */}
                {console.log("All Request: ", displayRequest)}
                <div className="table">
                    <p>Title</p>
                    <p>Bid/Offer</p>
                    <p>From:</p>
                    <p>To:</p>
                </div>
                {displayRequest.map((item) => (
                    <div className='jobCard' onClick={()=>handleOpen(item._id)}>
                        <p key={uuidv4()}>{item.title}</p>
                        <p>{item.bid}</p>
                        <p>{stateTable[item.from.state]}</p>
                        <p>{stateTable[item.destination.state]}</p>
                        {/* <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                        <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button > */}
                    </div>
                ))}
                
                <h2>Got Space!</h2>
                {/* Display 5 Latest Job Service here */}
                {console.log("All Service: ", displayService)}
                {/* {console.log("Provides: ", jobProvides)} */}
                {displayService.map((item) => (
                    <div className='jobCard' onClick={()=>handleOpen(item._id)}>
                        <p key={uuidv4()}>{item.title}</p>
                        <p>{item.bid}</p>
                        <p>{stateTable[item.from.state]}</p>
                        <p>{stateTable[item.destination.state]}</p>
                        {/* <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                        <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button > */}
                    </div>
                ))}
            </section>
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Welcome to Rack and Strap!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        To view full details including contact info, please log in or sign up.
                    </Typography>
                    <Button onClick={goToLogin}>Login/Sign Up</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default LandingPage;