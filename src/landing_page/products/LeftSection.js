import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDisription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container border-bottom">
      <div className="row mb-5 mt-3">
        <div className="col-5">
          <img src={imageURL} />
        </div>
        <div className="col-1"></div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDisription}</p>
          <div>
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try Demo <i class="far fa-hand-point-right"></i>
            </a>
            <a
              href={learnMore}
              style={{ marginLeft: "50px", textDecoration: "none" }}
            >
              Learn Demo <i class="far fa-hand-point-right"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg"></img>
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
