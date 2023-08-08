import React from "react";


const JobCard = ({user, bid, equipmentm, title}) => {

    return (
        <div className="card-container">
            <main className="left-sections-card">
                <section className="map-section">
                    <div className="map">map here</div>
                    <div className="title">title</div>
                </section>

                <section className="user-profile">
                    <img src="" alt="" />
                    <span>user.username</span>
                </section>
            </main>


            <div className="bid">$$$$$</div>

            <section className="equipment">
                <div>logos</div>    
            </section>
            
            <section className="equipment">
                <div>logos</div>    
            </section>

            <button>MSN</button>
        </div>
    )
}