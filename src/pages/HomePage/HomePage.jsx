import Input from '@components/Input/Input';
import ToggleLink from '@components/ToggleLink/ToggleLink';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import Contact from '@pages/Contact/Contact';
import Equipments from '@pages/Gear/Gear';
import Past from '@pages/Past/Past';
import Pictures from '@pages/Pictures/Pictures';
import Videos from '@pages/Videos/Videos';
import shapeInSpace from '@sketches/shapeInSpace';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';

import './home-page.css';

const HomePage = () => {
  const navigate = useNavigate();
  const pics = Array(9)
    .fill('')
    .map((item, index) => {
      return {
        name: '',
        src: '/imgs/_' + index + '.jpg',
      };
    })
    .reverse();

  return (
    <div>
      <div className="main-container">
        <div className="top-section">
          <div
            className="header"
            onClick={() => {
              window.sk.backgroundColor = Math.random() * 256;
              navigate('/');
            }}
          >
            <h1 className="header__title">Studio Salt Echoes</h1>
            <p className="header__address">91 rue st antoine 75004 Paris</p>
            {/* <img className="header__icon" src="./icon.svg" /> */}
          </div>
          <div
            className="menu"
            onClick={() => {
              window.sk.backgroundColor = Math.random() * 255;
            }}
          >
            <ToggleLink
              className={({ isActive }) =>
                isActive ? 'menu-item menu-item--active' : 'menu-item'
              }
              to="/past"
            >
              Passé Composé
            </ToggleLink>
            <ToggleLink
              className={({ isActive }) =>
                isActive ? 'menu-item menu-item--active' : 'menu-item'
              }
              to="/contact"
            >
              Contact
            </ToggleLink>
            <ToggleLink
              className={({ isActive }) =>
                isActive ? 'menu-item menu-item--active' : 'menu-item'
              }
              to="/gear"
            >
              Gear
            </ToggleLink>
            <ToggleLink
              className={({ isActive }) =>
                isActive ? 'menu-item menu-item--active' : 'menu-item'
              }
              to={'/pics'}
            >
              Passé Imprimé
            </ToggleLink>
          </div>
        </div>
        <p className="description">
          Cozy corner for sonic experimentation and collaboration in central
          Paris, non-profit studio with top-tier gear.
        </p>

        <Routes>
          <Route path="/" element={<Videos />} />
          <Route path="/past" element={<Past />} />
          <Route path="/gear" element={<Equipments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<div>Information Content</div>} />
          <Route path="/pics" element={<Pictures pics={pics} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Input />
      </div>
      <ReactP5Wrapper sketch={shapeInSpace} />
    </div>
  );
};

export default HomePage;
