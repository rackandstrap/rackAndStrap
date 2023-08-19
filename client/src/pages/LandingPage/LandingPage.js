import React from "react";
import kayakImg from "../../pages/assests/landing_image.jpg"
import "./LandingPage.css"


const landingPage = () => {
    return (
        <div className="landing-page-content-container">
            <section className="left-landign-page">
                <h1  className="logo" >Rack & Strap</h1>
                <h4> Moving Kayaks, With Stoked Folks</h4>
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