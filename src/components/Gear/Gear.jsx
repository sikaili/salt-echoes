
import './Gear.css'
const devices = {
  "equipment": [
    {
      "name": "Genelec 8240 * 2"
    },
    {
      "name": "Genelec 8040 * 2"
    },
    {
      "name": "Genelec 8030 * 4 / 1029 * 2"
    },
    {
      "name": "Prepared Piano (strings)"
    },
    {
      "name": "Girardin MT68 Console"
    },
    {
      "name": "Girardin PM82 Console"
    },
    {
      "name": "Revox PR99"
    },
    {
      "name": "AKG C414 Microphone"
    },
    {
      "name": "RME Fireface UCX"
    },
    {
      "name": "Synths, Guitars, Pedals"
    },
    // {
    //   "name": "Fender American Pro Precision Bass"
    // },
    // {
    //   "name": "Fender American Vintage Jazzmaster"
    // },
    
  ]
}
const Equipments = () => {
  const pics = Array(10).fill('').map((item,index)=>{
    return {
      name: "",
      src: "/imgs/gear/_"+index+".jpg"
    }
  }).reverse();
  
  return (
    <div className="Gear">
      <h4>
        Gear for recording and monitoring:
      </h4>
      <p></p>
      {
        devices.equipment.map(device=>{
          return (
            <li key={device.name}>{device.name}</li>
          )
        })
      }
      <p></p>

      <img src={`/imgs/gear/_${Math.floor(Math.random()*9)}.jpg`}/>
      {/* <img src="/imgs/gear/_2.jpg"/>
      <img src="/imgs/gear/_0.jpg"/> */}


    </div>
  )
}

export default Equipments