import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-top">
        <h1 className=" text-center mt-4 ">People</h1>
      </div>

      <div
        className="row p-5 text-muted "
        style={{ lineHeight: "2.0", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/MyPic.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Shubham Shinare</h4>
          <h6>Full Stack Developer</h6>
        </div>
        <div className="col-6 p-5">
          <p>
            Shubham Shinare is a Full Stack Developer who enjoys building
            end-to-end web applications that are both functional and visually
            appealing. He specializes in connecting intuitive user interfaces
            with robust server-side logic and databases.
          </p>
          <p>
            Driven by a passion for problem-solving, he focuses on writing
            clean, scalable code to create seamless digital experiences. For
            him, the process of turning complex ideas into working software is
            where he finds his zen.
          </p>
          <p>
            Connect on{" "}
            <a
              href="https://github.com/shubh0284"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>{" "}
            /{" "}
            <a
              href="https://www.linkedin.com/in/shubham-shinare-398a5a2b7"
              style={{ textDecoration: "none" }}
            >
              LinkedIn{" "}
            </a>
            /{" "}
            <a
              href="https://leetcode.com/u/shubh0284/"
              style={{ textDecoration: "none" }}
            >
              LeetCode
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
