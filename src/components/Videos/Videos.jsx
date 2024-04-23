import React from "react";
import "./Video.css";
function Videos() {
  return (
    <>
      <div>
        <h4>Latest Experimental Sessions:</h4>
      </div>
      <div className="video-container">
        <iframe
          className="iframe"
          src="https://www.youtube.com/embed/WtEFSjo-I3Q?vq=hd1080"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default Videos;
