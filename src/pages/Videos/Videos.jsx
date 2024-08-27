import { listIframe } from '../Past/Past';
import './videos.css';


function Videos() {
  return (
    <>
      <div>
        <h4>Latest Sessions:</h4>
      </div>
      <>
      {
        listIframe.map((item,index)=>(
          <div className="video-container" key={item?.src}>
          <iframe
            className="iframe"
            src={item?.src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            ></iframe>
        </div>
        ))
      }

      </>
    </>
  );
}

export default Videos;
