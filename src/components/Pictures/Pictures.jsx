import { useState } from "react";
import "./pictures.css";
// Ipics = {
//   src: "",
// };
function Pictures({ pics }) {
  const [currentBackground, setCurrentBackground] = useState("");
  return (
    <>
      <h4>Passé Imprimé:</h4>
      <div className="pictures">
        {pics.map((item) => (
          <img
            onMouseEnter={() => setCurrentBackground(item.src)}
            onMouseLeave={() => setCurrentBackground("")}
            src={item.src}
            key={item.src}
          />
        ))}
      </div>
      {currentBackground && (
        <img className="background-picture" src={currentBackground} />
      )}
    </>
  );
}

export default Pictures;
