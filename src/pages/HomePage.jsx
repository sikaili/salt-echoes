import './HomePage.css'
// import Upcoming from '../components/Upcoming';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import ToggleLink from '../components/ToggleLink/ToggleLink';
import Pictures from '../components/Pictures/Pictures';
import Videos from '../components/Videos/Videos';
import Audios from '../components/Audios/Audios';
import Contact from '../components/Contact/Contact';
import Input from '../components/Input/Input';
import Equipments from '../components/Gear/Gear';
import shapeInSpace from '../sketches/shapeInSpace';

const HomePage = () => {
  const navigate = useNavigate();

  const pics = Array(9).fill('').map((item,index)=>{
    return {
      name: "",
      src: "/imgs/_"+index+".jpg"
    }
  }).reverse();

  return (

    <div>
      <div className='MainContainer'>
        <div className='TopSection'>
          <div className="Header" onClick={()=>{
            window.sk.backgroundColor = Math.random()*256;
            navigate('/')
          }}>
            <h1 className='Header__title'>Studio Salt Echoes</h1>
            <p className="Header__address">91 rue st antoine 75004 Paris</p>
            {/* <img className="Header__icon" src="./icon.svg" /> */}
          </div>
          <div className="Menu" onClick={()=>{
            window.sk.backgroundColor = Math.random()*255;

          }}>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to="/audio">Passé Composé</ToggleLink>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to="/contact">Contact</ToggleLink>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to="/gear">Gear</ToggleLink>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to={"/past"}>Passé Imprimé</ToggleLink>
          </div>
        </div>
        <p className='Description'>Cozy corner for sonic experimentation and collaboration in central Paris, non-profit studio with top-tier gear.</p>

        <Routes>
          <Route path="/" element={<Videos/>} />
          <Route path="/audio" element={<Audios/>} />
          <Route path="/gear" element={<Equipments/>} />
          <Route path="/contact" element={<Contact/>} />

          <Route path="/info" element={<div>Information Content</div>} />
          <Route path="/past" element={<Pictures pics={pics} />} />
          <Route path="*" element={<Navigate replace to="/" />} />

          {/* Add other routes as needed */}
        </Routes>
        <Input></Input>

      </div>
      <ReactP5Wrapper sketch={shapeInSpace} />

    </div>

  );
};

export default HomePage;