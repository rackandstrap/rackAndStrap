import React from "react";
import kayakImg from "../../pages/assests/solo-kayak.png"
import "./LandingPage.css"
// import env from "react-dotenv";


const landingPage = () => {

    const API_BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log("BASE URL: ", API_BASE_URL)

    return (
        <div className="landing-page-content-container">
            <section className="left-landign-page">
                <h1>Reack & Strap</h1>
                <img src={kayakImg} alt="ima" />
            </section>
            
            <section className="right-landing-page">
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
                <h2>hello</h2>
            </section>
        </div>
    );
}

export default landingPage;