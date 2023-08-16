import React from "react";
import kayakImg from "../../pages/assests/solo-kayak.png"
import "./LandingPage.css"


const landingPage = () => {
    
    const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://production-api.example.com'
    : 'http://localhost:3001';
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