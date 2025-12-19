import React from "react";

function RightSection({ imageURL, productName, productDisription, learnMore }) {
  return (
    <div className="container border-bottom">
      <div className="row ">
        <div className="col-1"></div>
        <div className="col-6 p-5 mt-2">
          <h1 className="mt-5">{productName}</h1>
          <p>{productDisription}</p>
          <div>
            <a href={learnMore} style={{ textDecoration: "none" }}>
              Learn More <i class="far fa-hand-point-right"></i>
            </a>
          </div>
        </div>
        <div className="col-5">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
