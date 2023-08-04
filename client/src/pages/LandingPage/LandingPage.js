import React from "react";
import kayakImg from "../../pages/assests/solo-kayak.png"
import "./LandingPage.css"


const landingPage = () => {
    return (
        <div className="landing-page-content-container">
            
            <section className="left-landign-page">
                <img src={kayakImg} alt="ima" />
            </section>
            
            <section className="right-landing-page">
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