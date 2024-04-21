import './HomePage.css'
import Upcoming from '../components/Upcoming';
import Equipments from '../components/Equipments';
import Input from '../components/Input/Input';
import Pictures from '../components/Pictures/Pictures';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useNavigate, Routes, Route,Navigate, NavLink } from 'react-router-dom';
import ToggleLink from '../components/ToggleLink/ToggleLink';
import Videos from '../components/Videos/Videos';
function sketch(sk) {
  const createDebris = (index)=> ({
    index:index,
    x:sk.noise(index)*sk.windowWidth,
    y:Math.random()*sk.windowHeight,
    speed: Math.random()*0.02,
    size: sk.noise(1000/index)*30,
    vector: {
      x:sk.noise(index/20)-0.3+Math.sin(sk.frameCount/200),
      y:sk.noise(index/100)-0.2,
    },
    isOutSide:(item)=>{
      return (item.x > sk.width)||(item.y>sk.height);
    },
    display: (item)=>{
      sk.push();
      if(item.isOutSide(item)){
        item.vector.x*=-1;
        item.vector.y*=-1;
      }
      sk.translate(item.x +=item.vector.x, item.y +=item.vector.y);
      sk.rotateZ(sk.frameCount * item.speed);
      sk.rotateX(sk.frameCount * item.speed);
      sk.rotateY(sk.frameCount * 0.01);
      switch (Math.floor(sk.noise(sk.frameCount/200+sk.mouseX/3+sk.mouseY/3+index) * 3)) {
        case 0:
          sk.plane(item.size);
          break;
        case 1:
          sk.box(item.size/2);
          break;
        case 2:
          sk.sphere(item.size / 4);
          break;
      }
      sk.pop();
    }
  })
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL);
    sk.normalMaterial();
    
    sk.debris = Array(666).fill('').map((item, index)=>{
      return createDebris(index);
    })
    
  }
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  }

  sk.draw = () => {
    sk.background(240-Math.sin(sk.frameCount/50)*5);
    sk.translate(-sk.width/2,-sk.height/2)
    sk.debris.map(item=>{
      item.display(item);
    })
  };
}

const HomePage = () => {
  const navigate = useNavigate();

  return (

    <div>
      <div className='MainContainer'>
        <div className='TopSection'>
          <div className="Header" onClick={()=>{
            navigate('/')
          }}>
            <h1 className='Header__title'>Studio Salt Echoes</h1>
            <p className="Header__address">91 rue st antoine 75004 Paris</p>
            {/* <img className="Header__icon" src="./icon.svg" /> */}
          </div>
          <div className="Menu">
            <NavLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to="/upcoming">Futur Proche</NavLink>
            <a   className="MenuItem"
              href="mailto:info@salt-echoes.com?subject=Inquiry from the website&body=Hi there,">Contact</a>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to="/gear">Gear</ToggleLink>
            <ToggleLink   className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
              to={"/past"}>Passé composé</ToggleLink>
          </div>
        </div>
        <p className='Description'>Cozy corner for sonic experimentation and collaboration in central Paris, non-profit studio with top-tier gear.</p>

        <Routes>
          <Route path="/" element={<Videos/>} />
          <Route path="/upcoming" element={<Videos/>} />
          <Route path="/gear" element={<Equipments></Equipments>} />
          <Route path="/info" element={<div>Information Content</div>} />
          <Route path="/past" element={<Pictures />} />
          <Route path="*" element={<Navigate replace to="/" />} />

          {/* Add other routes as needed */}
        </Routes>
        <Input></Input>

      </div>
      <ReactP5Wrapper sketch={sketch} />

    </div>

  );
};

export default HomePage;