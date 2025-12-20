import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="col p-3 mb-1 mt-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 ">
        <div className="col-6 p-3 ">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input placeholder="Eg: how do i activate F&O, why is my order getting rejected.." />
          <br />
          <br />
          <a href="" style={{ marginRight: "15px" }}>
            Track account opening
          </a>
          <a href="" style={{ marginRight: "15px" }}>
            Track segment activation
          </a>
          <a href="" style={{ marginRight: "15px" }}>
            Intraday.
          </a>
          <a href="" style={{ marginRight: "15px" }}>
            margins
          </a>
          <a href="" style={{ marginRight: "15px" }}>
            Kite user manual
          </a>
        </div>
        <div className="col-6 p-5">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li>
              <a href="" style={{ lineHeight: "2.5" }}>
                Current Takeovers and Delisting - January, 2024
              </a>
            </li>
            <li>
              <a href="" style={{ lineHeight: "2.5" }}>
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
