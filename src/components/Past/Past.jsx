import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./past.css";
function Past() {
  const listIframe = [
    {
      name: "Impro Hadéen.V 04/19/2024",
      src: "https://www.youtube.com/embed/WtEFSjo-I3Q?si=9FZCqy16k7mrAItt",
      participants: "Arthur Caumont, Dorian Campagne, Sikai Li, Weizhou Zhang",
    },
  ];

  const listAudio = [
    {
      name: "04/19/2024 Impro Hadéen.IV",
      participants: "Arthur Caumont, Dorian Campagne, Sikai Li, Weizhou Zhang",
      src: "/audio/jam_04_19_IV.m4a",
    },
    {
      name: "04/19/2024 Impro Hadéen.III",
      participants: "Arthur Caumont, Dorian Campagne, Sikai Li",
      src: "/audio/jam_04_19_III.m4a",
    },
    {
      name: "04/19/2024 Impro Hadéen.II",
      participants: "Arthur Caumont, Dorian Campagne, Sikai Li",
      src: "/audio/jam_04_19_II.m4a",
    },
    {
      name: "04/16/2024 Impro 2 X 2 (extrait)",
      participants: "Katya Krajza, Sikai Li",
      src: "/audio/jam_04_16_II_extrait.m4a",
    },
  ];

  return (
    <div className="past">
      <h4>Passé Composé:</h4>
      <div className="video-grid">
        {listIframe.map((item) => (
          <div key={item.name} className="video">
            <iframe
              className="iframe1"
              src={item.src + "?vq=hd1080"}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <p className="video-description">Video: {item.name}</p>
          </div>
        ))}
      </div>

      {listAudio.map((item) => (
        <AudioPlayer
          className="audio-player"
          key={item.name}
          header={item.name}
          src={item.src}
          onPlay={() => console.log("onPlay")}
          footer={item.participants}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          // other props here
        />
      ))}
    </div>
  );
}

export default Past;
